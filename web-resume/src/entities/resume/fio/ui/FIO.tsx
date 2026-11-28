import './FIO.css';
import {useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {resumeSelector} from "@entities/resume/model/slice/resume.slice.ts";
import {DEFAULT_PHOTO_PLACEHOLDER} from "@shared/config/const/image.ts";

/**
 * Компонент - FIO, для отображения в макете резюме.
 */
export default function FIO (){
  const modelSelector = useAppSelector(resumeSelector);
  const fioFromState = modelSelector.fio;
  const fioFull = [fioFromState.lastName, fioFromState.firstName, fioFromState.fatherName]
    .filter(Boolean).join(' ');

  const photo = fioFromState.photoUrl || DEFAULT_PHOTO_PLACEHOLDER;
    return (
      <>
        <section id = 'fio'>
          <article>
            <div
              id={'photo'}
              style={{backgroundImage: `url(${photo})`}}
            >
            </div>
            <p>{fioFull}</p>
          </article>
        </section>
      </>
    )
}