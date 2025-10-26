import PageBase from "../../components/base/PageBase";

interface PageNotFoundProps {
  baseUrl: string;
}

function PageNotFound({ baseUrl }: PageNotFoundProps) {
  return <PageBase baseUrl={baseUrl} />;
}

export default PageNotFound;
