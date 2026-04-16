import './JobInfo.css';
import {useCurrencyVariants} from "@entities/resume/job-info/api/hooks/currency.ts";
import {useEmploymentTypeVariants} from "@entities/resume/job-info/api/hooks/employmentType.ts";
import {useWorkScheduleVariants} from "@entities/resume/job-info/api/hooks/work-schedule.ts";
import {useJobInfoQueryState} from "@entities/resume/job-info/api/hooks/loadingOrErrorState.ts";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import {useEffect, useMemo} from "react";
import {Controller, useForm} from "react-hook-form";
import Input from "@shared/ui/input/Input.tsx";
import ServerError from "@shared/ui/serverError/ui/serverError.tsx";
import {Select} from "@shared/ui/Select/Select.tsx";
import {dataOption} from "@entities/resume/job-info/lib/mappers/mapper.ts";
import type {IJobInfoValidate} from "@features/jobInfo/types/jobinfo.types.ts";
import {useAppDispatch, useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import type {JobInfoState} from "@entities/resume/job-info/types/job-info.types.ts";
import type {IJobInfoConst} from "@shared/config/const/types/job-info.fieldConst.interfaces.ts";
import {fieldConst} from "@shared/config/const/job-title.validation.config.ts";
import {t} from "i18next";
import {
  setAmount,
  setCurrency,
  setEmploymentType,
  setJobTitle,
  setWorkSchedule
} from "@entities/resume/job-info/model/job-info.slice.ts";
import ErrorLabel from "@shared/ui/errorLabel/ErrorLabel.tsx";

//TODO: пересмотреть в случае реализован переключателя языка
//TODO: максимально подогнать под i18n, пока без переключателя языка
//TODO: подумать все же о галочке которая уберет желаемую зарплату
export default function JobInfo() {

  const currencyVariants = useCurrencyVariants();
  const employmentVariants = useEmploymentTypeVariants();
  const workScheduleVariants = useWorkScheduleVariants();

  const {loading, error} = useJobInfoQueryState({
    currency: currencyVariants,
    employment: employmentVariants,
    workSchedule: workScheduleVariants
  });

  const dispatch = useAppDispatch();
  const jobInfoSelector: JobInfoState = useAppSelector(state => state.jobInfo);
  const jobTitle = jobInfoSelector.jobTitle;

  const validationConfig: IJobInfoConst = fieldConst;
  const {
    control,
    formState: { isValid },
  } = useForm<IJobInfoValidate>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      jobTitle: jobTitle ?? ''
    }
  });

  useEffect(() => {
    const nextButtonTriggers = loading || !!error || !isValid
    dispatch(nextStepStateDisabled(nextButtonTriggers));

    return () => {
      dispatch(nextStepStateDisabled(false));
    }
  }, [loading, error, dispatch, isValid]);

  const currencyOptions = useMemo(() => dataOption(currencyVariants.data), [currencyVariants.data]);
  const employmentOptions = useMemo(() => dataOption(employmentVariants.data), [employmentVariants.data]);
  const workScheduleOptions = useMemo(() => dataOption(workScheduleVariants.data), [workScheduleVariants.data]);

  if (loading) {
    return <p>Ожидание данных....</p>;
  }

  if (error)
    return <ServerError />

  return (
    <>
      <div data-section="job-info" id="item-job" className="section item-hidden">
        <div className="item-main-header">
          <h3>{t('resume.jobInfo.title')}</h3>
        </div>
        <div className="item-job-body">
          <div>
            <label htmlFor="job">{t('resume.jobInfo.jobTitle')}</label><br/>
            <Controller
              name={'jobTitle'}
              control={control}
              rules={{
                required: t('resume.validation.common.required'),
              }}
              render={({field, fieldState}) =>
                <>
                  <Input
                    type="text"
                    id="job"
                    spellCheck={false}
                    baseInput={false}
                    {...field}
                    maxLength={validationConfig.joTitle.maxLength}
                    onChange={(e) => {
                      const jobTitleValue = e.target.value;
                      field.onChange(jobTitleValue);
                      dispatch(setJobTitle(jobTitleValue));
                    }}
                  />
                  <ErrorLabel
                    error={fieldState.error}
                    baseError={true}
                  />
                </>
              }
            />

          </div>
          <br/>
          <div className="desired-job-info">
            <div>
              <label htmlFor="amount">{t('resume.jobInfo.amount')}</label><br/>
              <Input
                type={'number'}
                id={'amount'}
                name={"desiredSalary"}
                spellCheck={false}
                baseInput={false}
                value={jobInfoSelector.amount}
                onChange={(e) =>
                  dispatch(setAmount(Number(e.target.value)))
                }
              />
            </div>
            <div>
              <Select<number>
                label={t('resume.jobInfo.currency')}
                id={'currency'}
                name={'currency'}
                options={currencyOptions}
                value={jobInfoSelector.currency}
                onChangeValue={(code) =>
                  dispatch(setCurrency(code))
                }
              />
            </div>
            <div>
              <Select<number>
                label={t('resume.jobInfo.employmentType')}
                id={'employment-type'}
                name={'employmentType'}
                options={employmentOptions}
                value={jobInfoSelector.employmentType}
                onChangeValue={(id) =>
                  dispatch(setEmploymentType(id))
                }
              />
            </div>
            <div>
              <Select<number>
                label={t('resume.jobInfo.workSchedule')}
                id={'work-schedule'}
                name={'workSchedule'}
                options={workScheduleOptions}
                value={jobInfoSelector.workSchedule}
                onChangeValue={(id) =>
                  dispatch(setWorkSchedule(id))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}