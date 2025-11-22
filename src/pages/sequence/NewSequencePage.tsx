import PageBase from "../../components/base/PageBase";

interface NewSequencePageProps {
  baseUrl: string;
}

function NewSequencePage({ baseUrl }: NewSequencePageProps) {
  return <PageBase header="New sequence" />;
}

export default NewSequencePage;
