import './FIO.css';
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {resumeSelector} from "@entities/resume/model/slice/resume.slice.ts";
import {DEFAULT_PHOTO_PLACEHOLDER} from "@shared/config/const/image.ts";

export default function FIO (){
  const modelSelector = useAppSelector(resumeSelector);
  const fioFromState = modelSelector.fio;
  const fioFull = [fioFromState.lastName, fioFromState.firstName, fioFromState.fatherName]
    .filter(Boolean).join(' ');

  const photo = fioFromState.photoUrl || DEFAULT_PHOTO_PLACEHOLDER;
    return (
      <>
        <div
          id={'photo-photo'}
          style={{backgroundImage: `url(${photo})`}}>
        </div>
        <h1>{fioFull}</h1>
      </>
    )
}