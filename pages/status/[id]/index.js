import Head from 'next/head';

import Deveet from 'components/Deveet';

export default function DeveetPage({ deveet }) {
  return (
    <>
      <Head>
        <title>
          {deveet.username} en devter: {`"${deveet.content}"`}
        </title>
        <meta name='description' content={deveet.content} />
      </Head>
      <Deveet deveet={deveet} />
    </>
  );
}

/*
TODO: fix this, because when building this app with npm run build, 
      the request to the api endpoint results in an error
*/

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/deveets');
  const deveets = await res.json();
  const paths = deveets.map(deveet => ({ params: { id: deveet.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/deveets/${id}`);
  if (res.ok) {
    const deveet = await res.json();
    return {
      props: { deveet },
    };
  }
}
