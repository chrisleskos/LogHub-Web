import PageBase from "../../components/base/PageBase";

interface AboutPageProps {
  baseUrl: string;
}

function AboutPage({ baseUrl }: AboutPageProps) {
  return <PageBase header="About" />;
}

export default AboutPage;
