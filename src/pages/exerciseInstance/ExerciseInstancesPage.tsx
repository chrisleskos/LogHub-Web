import PageBase from "../../components/base/PageBase";

interface GetAllExerciseInstancesProps {
  baseUrl: string;
}

function GetAllExerciseInstancesPage({
  baseUrl,
}: GetAllExerciseInstancesProps) {
  return (
    <>
      <PageBase header="Exercise Instances" />
    </>
  );
}

export default GetAllExerciseInstancesPage;
