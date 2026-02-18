import Footer from "@widgets/layoutHeader/LayoutHeader";
import Header from "@widgets/layoutFooter/LayoutFooter";
import type {PropsWithChildren} from "react";

export default function MainLayout({children}:PropsWithChildren) {

  return (
    <>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}