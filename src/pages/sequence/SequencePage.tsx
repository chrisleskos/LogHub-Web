import PageBase from "../../components/base/PageBase";
import SequenceList from "../../components/display/list/specifics/SequenceList";

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
      <SequenceList
        baseUrl={baseUrl}
        handleOnElementClick={handleElementClick}
        haveAddBtn
      />
    </>
  );
}

export default SequencesPage;
