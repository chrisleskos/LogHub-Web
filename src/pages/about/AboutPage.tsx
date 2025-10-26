import PageBase from "../../components/base/PageBase";

interface AboutPageProps {
  baseUrl: string;
}

function AboutPage({ baseUrl }: AboutPageProps) {
  return <PageBase baseUrl={baseUrl} />;
}

export default AboutPage;
