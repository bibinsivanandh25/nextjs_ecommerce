import Head from "next/head";
import ModalComponent from "../components/atoms/ModalComponent";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MrMrsCart</title>
      </Head>
      <div> Empty project</div>
      <ModalComponent open={true}>
        <div>suhil</div>
      </ModalComponent>
    </div>
  );
}
