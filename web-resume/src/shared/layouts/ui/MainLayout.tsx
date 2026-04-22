import Header from "@widgets/layoutHeader/LayoutHeader.tsx";
import Footer from "@widgets/layoutFooter/LayoutFooter.tsx";
import Preview from "@widgets/preview/ui/Preview.tsx";

export default function MainLayout() {

  return (
    <>
      <div className={"main-container"}>
        <Header />
        <Preview />
        <Footer />
      </div>
    </>
  )
}