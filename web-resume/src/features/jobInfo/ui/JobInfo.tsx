import './JobInfo.css';
import {useEffect} from "react";
import {useCurrencyList} from "@entities/resume/job-info/api/hooks/currency.ts";

export default function JobInfo() {

  const currencyList = useCurrencyList();
  // const {data} = useGetEmploymentTypeListQuery('');

  //TODO: для тестов, удалить после реализации логики компонента
  useEffect(() => {
   console.log(currencyList);
  }, [currencyList]);

  const formData = {
    byAgreement: false
  }

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
              value={''}
            />
          </div>
          <br/>
          <div className="desired-job-info">
            {!formData.byAgreement && (
              <>
                <div>
                  <label htmlFor="amount">Желаемая зарплата</label><br/>
                  <input
                    type="number"
                    id="amount"
                    name="desiredSalary"
                    spellCheck="false"
                    value={''}
                  />
                </div>
                <div>
                  <label htmlFor="currency">Валюта</label><br/>
                  <select
                    id="currency"
                    name="currency"
                    value={''}
                  >
                    {/*{ Array.isArray(currencyList) && currencyList.length > 0 &&*/}
                    {/*  currencyList.map((item) => (*/}
                    {/*    <option key={item.currencyCode} value={item.currencyCode}>{item.currencyNameRu}</option>*/}
                    {/*  ))}*/}
                  </select>
                </div>
              </>
            )}
            <div>
              <br/>
              <label htmlFor="employment-type">Тип занятости</label><br/>
              <select
                id="employment-type"
                name="employmentType"
                value={''}
              >
                {/*{ Array.isArray(employmentType) && employmentType.length > 0 &&*/}
                {/*  employmentType.map((item) => (*/}
                {/*    <option key={item.id} value={item.id}>{item.employmentTypeNameRu}</option>*/}
                {/*  ))}*/}
              </select>
            </div>
            <div>
              <br/>
              <label htmlFor="work-schedule">График работы</label><br/>
              <select
                id="work-schedule"
                name="workSchedule"
                spellCheck="false"
                value={''}
              >
                {/*{ Array.isArray(workSchedule) && workSchedule.length > 0 &&*/}
                {/*  workSchedule.map((item) => (*/}
                {/*    <option key={item.id} value={item.id}>{item.workScheduleNameRu}</option>*/}
                {/*  ))}*/}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}