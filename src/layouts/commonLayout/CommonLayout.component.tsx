import Head from "next/head";
import FooterComponent from "../footer/Footer.component";
import SideMenuComponent from "../sideMenu/SideMenu.component";
import scss from "./CommonLayout.module.scss";

const LayoutComponent = (props: any) => {
  // const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Fixxy</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={scss.layout}
        // style={{ padding: session ? "0 24px 0 80px" : 0 }}
        style={{ padding: "0 24px 0 80px" }}
      >
        {/* {session && <SideMenu />} */}
        {/*<SideMenuComponent />*/}

        {props.children}
        {/*<FooterComponent />*/}
      </main>
    </>
  );
};

export default LayoutComponent;
