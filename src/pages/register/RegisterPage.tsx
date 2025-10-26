interface RegisterPageProps {
  baseUrl: string;
  path: string;
}

function RegisterPage({ baseUrl, path }: RegisterPageProps) {
  const la = baseUrl + path;
  return <div>RegisterPage</div>;
}

export default RegisterPage;
