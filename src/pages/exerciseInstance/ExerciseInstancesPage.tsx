import PageBase from "../../components/base/PageBase";
import ExerciseInstanceList from "../../components/display/list/specifics/ExerciseInstanceList";

interface ExerciseInstancesProps {
  baseUrl: string;
}

function ExerciseInstancesPage({ baseUrl }: ExerciseInstancesProps) {
  const handleElementClick = (id: number) => {
    window.location.href = "/exercise-instance/" + id;
  };
  return (
    <>
      <PageBase header="Equipment" />
      <ExerciseInstanceList
        baseUrl={baseUrl}
        haveAddBtn={true}
        handleOnElementClick={handleElementClick}
      />
    </>
  );
}

export default ExerciseInstancesPage;
