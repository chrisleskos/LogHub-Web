import HandleRoutes from "./HandleRoutes";

function App() {
  const host = import.meta.env.VITE_API_HOST;
  const port = import.meta.env.VITE_API_PORT;
  const vaccoonApiPath = import.meta.env.VITE_API_PATH;
  const baseUrl = host + ":" + port + vaccoonApiPath;
  return (
    <>
      <div className="App">
        <HandleRoutes baseUrl={baseUrl} />
      </div>
    </>
  );
}

export default App;
