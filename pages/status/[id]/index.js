import Deveet from 'components/Deveet';

export default function DeveetPage(props) {
  return (
    <>
      <Deveet deveet={props.data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/deveets/${id}`);
  if (res.ok) {
    const data = await res.json();
    return {
      props: { data },
    };
  }
}
