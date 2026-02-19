import './Preview.css';
import Button from "@shared/ui/button/Button.tsx";
import ResumeBuilder from "@widgets/ResumeBuilder/ui/ResumeBuilder.tsx";
import {useResumeStart} from "@features/resume-start/model/ResumeStart.ts";
import {previewInfo} from "@shared/config/Preview.ts";

export default function Preview() {
  const {started, handleStart} = useResumeStart();
  return (
    <>
      <main>
        {started
          ? <ResumeBuilder />
          : (
            <div className="prestart-resume">
              <h1>{previewInfo.previewTitle}</h1>
              <h3>{previewInfo.previewDescription}</h3>
              <Button
                baseButton={false}
                onClick={handleStart}
                className={"preview-button"}
                children={<span className={"get-start"}>{previewInfo.previewButtonText}</span>}
              />
            </div>
          )
        }
      </main>
    </>
  )
}