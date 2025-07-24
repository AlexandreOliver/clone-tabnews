import useSWR from "swr";

async function fetchStatus(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function Home() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <DatabaseStatus />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  let updateAtText = "Carregando...";

  if (!isLoading && data) {
    updateAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updateAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  let databaseInfo = "Carregando...";

  if (!isLoading && data) {
    databaseInfo = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões Abertas: {data.dependencies.database.connections_opening}
        </div>
        <div>
          Conexões Máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>Banco de Dados:</h1>
      <div>{databaseInfo}</div>
    </div>
  );
}
