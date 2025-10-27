import PageBase from "../../components/base/PageBase";

interface PageNotFoundProps {
  baseUrl: string;
}

function PageNotFound({ baseUrl }: PageNotFoundProps) {
  return (
    <>
      <PageBase />
      <div>Page Not Found</div>
    </>
  );
}

export default PageNotFound;
