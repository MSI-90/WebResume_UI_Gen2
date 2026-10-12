import "./PersonalInfo.css";
import {t} from "i18next";
import {useBirthdayVariants} from "@entities/resume/personalInfo/api/birthday.ts";
import {Select} from "@shared/ui/Select/Select.tsx";
import {useMemo} from "react";
import {dataOption} from "@entities/resume/personalInfo/lib/mappers/mapper.ts";

export default function PersonalInfo() {
  const birthdayVariants = useBirthdayVariants();

  const birthdayOptions = useMemo(() =>
      dataOption(birthdayVariants.data), [birthdayVariants.data]);

  return (
  <>
    <div>
      <Select<number>
          label={t('resume.personalinfo.birthDate')}
          id={'birthday-day'}
          name={'birthday-day'}
          options={birthdayOptions}

      />
    </div>
  </>
  )
}
