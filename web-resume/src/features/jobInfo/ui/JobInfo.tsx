import './JobInfo.css';
import {useCurrencyVariants} from "@entities/resume/job-info/api/hooks/currency.ts";
import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import {useEmploymentTypeVariants} from "@entities/resume/job-info/api/hooks/employmentType.ts";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";
import {useWorkScheduleVariants} from "@entities/resume/job-info/api/hooks/work-schedule.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";
import {useJobInfoQueryState} from "@entities/resume/job-info/api/hooks/loadingOrErrorState.ts";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import type {IContactInfoValidate} from "@features/contactInfo/types/contactInfo.types.ts";
import Input from "@shared/ui/input/Input.tsx";
import ServerError from "@shared/ui/serverError/ui/serverError.tsx";
import {Select} from "@shared/ui/Select/Select.tsx";

//TODO: пересмотреть в случае реализован переключателя языка
//TODO: select - хочу дженерик компонент.
//TODO: в случае возникновения ошибки загрузки данных предусмотреть форму обратной связи для оперативного информирования, либо
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

  const currencyOptions = currencyVariants.data?.map((item: ICurrency) => ({
    value: item.currencyCode,
    label: item.currencyNameRu,
  })) || [];

  const employmentOptions = employmentVariants.data?.map((item: IEmployment) => ({
    value: item.id,
    label: item.employmentTypeNameRu,
  })) || [];

  const workScheduleOptions = workScheduleVariants.data?.map((item: IWorkSchedule) => ({
    value: item.id,
    label: item.workScheduleNameRu,
  })) || [];

  const [currencyVariant, setCurrencyVariant] = useState<number>(0);
  const [employmentVariant, setEmploymentVariant] = useState<number>(0);
  const [workScheduleVariant, setWorkScheduleVariant] = useState<number>(0);

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