import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MrMrsCart</title>
      </Head>
      <TableComponent columns={columns} tableRows={rows} />
    </div>
  );
}
