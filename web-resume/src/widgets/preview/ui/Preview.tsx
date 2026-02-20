import './Preview.css';
import Button from "@shared/ui/button/Button.tsx";
import ResumeBuilder from "@widgets/ResumeBuilder/ui/ResumeBuilder.tsx";
import {useResumeStart} from "@features/resume-start/model/ResumeStart.ts";
import {useTranslation} from "react-i18next";

export default function Preview() {
  const {started, handleStart} = useResumeStart();
  const {t} = useTranslation();

  return (
    <>
      <main>
        {started
          ? <ResumeBuilder />
          : (
            <div className="prestart-resume">
              <h1>{t('preview.title')}</h1>
              <h3>{t('preview.description')}</h3>
              <Button
                baseButton={false}
                onClick={handleStart}
                className={"preview-button"}
                children={<span className={"get-start"}>
                  {t('preview.startButton')}
                </span>}
              />
            </div>
          )
        }
      </main>
    </>
  )
}