import Header from "@widgets/layoutHeader/LayoutHeader.tsx";
import Footer from "@widgets/layoutFooter/LayoutFooter.tsx";
import type {PropsWithChildren} from "react";
import Preview from "@widgets/preview/ui/Preview.tsx";

export default function MainLayout({children}:PropsWithChildren) {

  return (
    <>
      <div className={"main-container"}>
        <Header />
        <Preview />
        {children}
        <Footer />
      </div>
    </>
  )
}