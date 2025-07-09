import database from "/infra/database.js";

async function index(request, response) {
  const updateAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseOpeningConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseVersion = databaseVersionResult.rows[0]["server_version"];
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0]["max_connections"];
  const databaseOpeningConnections =
    databaseOpeningConnectionsResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        connections_opening: databaseOpeningConnections,
      },
    },
  });
}

export default index;
