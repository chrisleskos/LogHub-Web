import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import PageNotFound from "./pages/notFound/PageNotFound";
import NewExerciseInstancePage from "./pages/exerciseInstance/NewExerciseInstancePage";
import EquipmentPage from "./pages/equipment/EquipmentPage";
import NewEquipmentPage from "./pages/equipment/NewEquipmentPage";
import ExercisePage from "./pages/exercise/ExercisePage";
import NewExercisePage from "./pages/exercise/NewExercisePage";
import ExerciseInstancesPage from "./pages/exerciseInstance/ExerciseInstancesPage";
import SequencesPage from "./pages/sequence/SequencePage";
import NewSequencePage from "./pages/sequence/NewSequencePage";

interface HandleRoutesProps {
  baseUrl: string;
}

function HandleRoutes({ baseUrl }: HandleRoutesProps) {
  return (
    <Routes>
      <Route path="" element={<HomePage baseUrl={baseUrl} />} />
      <Route path="/home" element={<HomePage baseUrl={baseUrl} />} />
      <Route path="/" element={<HomePage baseUrl={baseUrl} />} />
      <Route path="/about" element={<AboutPage baseUrl={baseUrl} />} />
      <Route path="/equipment">
        <Route index element={<EquipmentPage baseUrl={baseUrl} />} />
        <Route path="new" element={<NewEquipmentPage baseUrl={baseUrl} />} />
      </Route>
      <Route path="/exercise">
        <Route index element={<ExercisePage baseUrl={baseUrl} />} />
        <Route path="new" element={<NewExercisePage baseUrl={baseUrl} />} />
      </Route>
      <Route path="/exercise-instance">
        <Route index element={<ExerciseInstancesPage baseUrl={baseUrl} />} />
        <Route
          path="new"
          element={<NewExerciseInstancePage baseUrl={baseUrl} />}
        />
      </Route>
      <Route path="/sequence">
        <Route index element={<SequencesPage baseUrl={baseUrl} />} />
        <Route path="new" element={<NewSequencePage baseUrl={baseUrl} />} />
      </Route>
      <Route path="*" element={<PageNotFound baseUrl={baseUrl} />} />
    </Routes>
  );
}

export default HandleRoutes;
