import PageBase from "../../components/base/PageBase";

interface PageNotFoundProps {
  baseUrl: string;
}

function PageNotFound({ baseUrl }: PageNotFoundProps) {
  return (
    <>
      <PageBase header="Page Not Found" />
    </>
  );
}

export default PageNotFound;
