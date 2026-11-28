import './ResumePreviewPanelLayout.css';
import FIO from '@entities/resume/fio/ui/FIO';

/**
 * Компонент - layout, для отображения макета резюме.
 */
export default function ResumePreviewPanelLayout() {
  return (
    <>
      <div className={'resume__aside'}>
        <div className={'resume-container'}>
          <>
            <FIO />
          </>
        </div>
      </div>
    </>
  )
}