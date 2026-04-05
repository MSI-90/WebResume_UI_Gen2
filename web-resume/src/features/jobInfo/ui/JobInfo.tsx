import './JobInfo.css';
import {useCurrencyVariants} from "@entities/resume/job-info/api/hooks/currency.ts";
import type {ICurrency} from "@shared/api/currency/types/currency.interfaces.ts";
import {useEmploymentTypeVariants} from "@entities/resume/job-info/api/hooks/employmentType.ts";
import type {IEmployment} from "@shared/api/employnment-type/types/employment.interfaces.ts";
import {useWorkScheduleVariants} from "@entities/resume/job-info/api/hooks/work-schedule.ts";
import type {IWorkSchedule} from "@shared/api/work-schedule/types/work-schedule.interface.ts";
import {useJobInfoQueryState} from "@entities/resume/job-info/api/hooks/loadingOrErrorState.ts";
import {nextStepStateDisabled} from "@features/resume-builder/model/resumeFlow.slice.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import type {IContactInfoValidate} from "@features/contactInfo/types/contactInfo.types.ts";

//TODO: пересмотреть в случае реализован переключателя языка
//TODO: select - хочу дженерик компонент.
//TODO: в случае возникновения ошибки загрузки данных предусмотреть форму обратной связи для оперативного информирования, либо
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

  if (loading) {
    return <p>Ожидание данных....</p>;
  }

  if (error)
    return <p>Ошибка...</p>;

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
              <input
                type="number"
                id="amount"
                name="desiredSalary"
                spellCheck="false"
                //value={''}
              />
            </div>
            <div>
              <label htmlFor="currency">Валюта</label><br/>
              <select
                id="currency"
                name="currency"
                //value={''}
              >
                { currencyVariants && (Array.isArray(currencyVariants.data)) && currencyVariants.data.length > 0 &&
                  currencyVariants.data.map((item: ICurrency) => (
                    <option key={item?.currencyCode} value={item?.currencyCode}>{item?.currencyNameRu}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <br/>
              <label htmlFor="employment-type">Тип занятости</label><br/>
              <select
                id="employment-type"
                name="employmentType"
                //value={''}
              >
                { employmentVariants && (Array.isArray(employmentVariants.data)) && employmentVariants.data.length > 0 &&
                  employmentVariants.data.map((item: IEmployment) => (
                    <option key={item?.employmentTypeName} value={item?.employmentTypeName}>{item?.employmentTypeNameRu}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <br/>
              <label htmlFor="work-schedule">График работы</label><br/>
              <select
                id="work-schedule"
                name="workSchedule"
                spellCheck="false"
                //value={''}
              >
                { workScheduleVariants &&
                  (Array.isArray(workScheduleVariants.data)) && workScheduleVariants.data.length > 0 &&
                  workScheduleVariants.data.map((item: IWorkSchedule) => (
                    <option key={item?.workScheduleName} value={item?.workScheduleName}>{item?.workScheduleNameRu}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}