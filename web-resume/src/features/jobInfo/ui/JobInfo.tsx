import './JobInfo.css';
import {useCurrencyVariants} from "@entities/resume/job-info/api/hooks/currency.ts";
import {useEmploymentTypeVariants} from "@entities/resume/job-info/api/hooks/employmentType.ts";
import {useWorkScheduleVariants} from "@entities/resume/job-info/api/hooks/work-schedule.ts";
import {useJobInfoQueryState} from "@entities/resume/job-info/api/hooks/loadingOrErrorState.ts";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import type {IContactInfoValidate} from "@features/contactInfo/types/contactInfo.types.ts";
import Input from "@shared/ui/input/Input.tsx";
import ServerError from "@shared/ui/serverError/ui/serverError.tsx";
import {Select} from "@shared/ui/Select/Select.tsx";
import {dataOption} from "@entities/resume/job-info/lib/mappers/mapper.ts";

//TODO: пересмотреть в случае реализован переключателя языка
//TODO: максимально подогнать под i18n, пока без переключателя языка
//TODO: React-hook-form
export default function JobInfo() {

  const currencyVariants = useCurrencyVariants();
  const employmentVariants = useEmploymentTypeVariants();
  const workScheduleVariants = useWorkScheduleVariants();

  const {loading, error} = useJobInfoQueryState({
    currency: currencyVariants,
    employment: employmentVariants,
    workSchedule: workScheduleVariants
  });

  useEffect(() => {
    console.log(currencyVariants);
    console.log(employmentVariants);
    console.log(workScheduleVariants);
  }, [currencyVariants, employmentVariants, workScheduleVariants]);

  const dispatch = useDispatch();

  //TODO: IContactInfoValidate пока заглушка, далее заменить
  const {
    formState: { isValid },
  } = useForm<IContactInfoValidate>({
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const nextButtonTriggers = loading || !!error || !isValid
    dispatch(nextStepStateDisabled(nextButtonTriggers));
  }, [loading, error, dispatch, isValid]);

  const [currencyVariant, setCurrencyVariant] = useState<number>(0);
  const [employmentVariant, setEmploymentVariant] = useState<number>(0);
  const [workScheduleVariant, setWorkScheduleVariant] = useState<number>(0);

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
          <h3>Желаемая должность</h3>
        </div>
        <div className="item-job-body">
          <div>
            <label htmlFor="job">Должность</label><br/>
            <input
              type="text"
              id="job"
              name="jobTitle"
              spellCheck="false"
              //value={''}
            />
          </div>
          <br/>
          <div className="desired-job-info">
            <div>
              <label htmlFor="amount">Желаемая зарплата</label><br/>
              <Input
                type={'number'}
                id={'amount'}
                name={"desiredSalary"}
                spellCheck={false}
                baseInput={false}
                value={''}
              />
            </div>
            <div>
              <Select<number>
                label={'Валюта'}
                id={'currency'}
                name={'currency'}
                options={currencyOptions}
                value={currencyVariant}
                onChangeValue={(code) => setCurrencyVariant(code)}
              />
            </div>
            <div>
              <Select<number>
                label={'Тип занятости'}
                id={'employment-type'}
                name={'employmentType'}
                options={employmentOptions}
                value={employmentVariant}
                onChangeValue={(id) => setEmploymentVariant(id)}
              />
            </div>
            <div>
              <Select<number>
                label={'График работы'}
                id={'work-schedule'}
                name={'workSchedule'}
                options={workScheduleOptions}
                value={workScheduleVariant}
                onChangeValue={(id) => setWorkScheduleVariant(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}