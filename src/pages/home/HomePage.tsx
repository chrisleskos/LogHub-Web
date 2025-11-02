import PageBase from "../../components/base/PageBase";

interface HomePageProps {
  baseUrl: string;
}

function HomePage({ baseUrl }: HomePageProps) {
  return <PageBase header="Home" />;
}

export default HomePage;
