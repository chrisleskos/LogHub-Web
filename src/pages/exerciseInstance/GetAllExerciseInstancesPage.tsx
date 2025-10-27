import PageBase from "../../components/base/PageBase";

interface GetAllExerciseInstancesProps {
  baseUrl: string;
}

function GetAllExerciseInstancesPage({
  baseUrl,
}: GetAllExerciseInstancesProps) {
  return (
    <>
      <PageBase />
      <div>GetAllExerciseInstancesPage</div>
    </>
  );
}

export default GetAllExerciseInstancesPage;
