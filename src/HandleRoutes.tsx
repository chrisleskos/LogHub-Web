import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import PageNotFound from "./pages/notFound/PageNotFound";

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
      <Route path="*" element={<PageNotFound baseUrl={baseUrl} />} />
    </Routes>
  );
}

export default HandleRoutes;
