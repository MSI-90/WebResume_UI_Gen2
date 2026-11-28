import './ResumePreviewPanelLayout.css';
import Model from "@entities/resume/model/ui/Model.tsx";


/**
 * Компонент - layout, для отображения макета резюме.
 */
export default function ResumePreviewPanelLayout() {

  return (
    <>
      <div className={'resume__aside'}>
        <div className={'resume-container'}>
          <Model />
        </div>
      </div>
    </>
  )
}