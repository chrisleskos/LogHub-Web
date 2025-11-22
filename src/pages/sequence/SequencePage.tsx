import PageBase from "../../components/base/PageBase";

interface SequencePageProps {
  baseUrl: string;
}

function SequencesPage({ baseUrl }: SequencePageProps) {
  const handleElementClick = (id: number) => {
    window.location.href = "/sequence/" + id;
  };
  return (
    <>
      <PageBase header="Sequences" />
    </>
  );
}

export default SequencesPage;
