import PageBase from "../../components/base/PageBase";
import TrainingList from "../../components/display/list/specifics/TrainingList";

interface SequencePageProps {
  baseUrl: string;
}

function TrainingPage({ baseUrl }: SequencePageProps) {
  const handleElementClick = (id: number) => {
    window.location.href = "/training/" + id;
  };
  return (
    <>
      <PageBase header="Trainings" />
      <TrainingList
        baseUrl={baseUrl}
        handleOnElementClick={handleElementClick}
        haveAddBtn
      />
    </>
  );
}

export default TrainingPage;
