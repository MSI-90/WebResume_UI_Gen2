import './ResumePreviewPanelLayout.css';
import type {PropsWithChildren} from "react";

export default function ResumePreviewPanelLayout({children} : PropsWithChildren) {
  return (
    <>
      <div className={'resume__aside'}>
        {children}
      </div>
    </>
  )
}