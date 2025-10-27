import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import PageNotFound from "./pages/notFound/PageNotFound";
import NewExerciseInstancePage from "./pages/exerciseInstance/NewExerciseInstancePage";
import GetAllExerciseInstancesPage from "./pages/exerciseInstance/GetAllExerciseInstancesPage";
import EquipmentPage from "./pages/equipment/EquipmentPage";
import NewEquipmentPage from "./pages/equipment/NewEquipmentPage";

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
      <Route
        path="exercise-instance"
        element={<GetAllExerciseInstancesPage baseUrl={baseUrl} />}
      >
        <Route
          path="new"
          element={<NewExerciseInstancePage baseUrl={baseUrl} />}
        />
      </Route>
      <Route path="*" element={<PageNotFound baseUrl={baseUrl} />} />
    </Routes>
  );
}

export default HandleRoutes;
