import PageBase from "../../components/base/PageBase";
import ExerciseList from "../../components/display/list/specifics/ExerciseList";

interface exerciseProps {
  baseUrl: string;
}

function ExercisePage({ baseUrl }: exerciseProps) {
  const handleElementClick = (id: number) => {
    window.location.href = "/equipment/" + id;
  };

  return (
    <>
      <PageBase header="Exercises" />
      <ExerciseList
        baseUrl={baseUrl}
        haveAddBtn={true}
        handleOnElementClick={handleElementClick}
      />
    </>
  );
}

export default ExercisePage;
