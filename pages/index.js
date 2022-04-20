import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();
  // if (session === null) signIn();
  return (
    <div>
      <Head>
        <title>MrMrsCart</title>
      </Head>
      <div> Empty project</div>
      <div
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </div>
    </div>
  );
}
