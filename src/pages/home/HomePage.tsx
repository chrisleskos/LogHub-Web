import PageBase from "../../components/base/PageBase";

interface HomePageProps {
  baseUrl: string;
}

function HomePage({ baseUrl }: HomePageProps) {
  return <PageBase baseUrl={baseUrl} />;
}

export default HomePage;
