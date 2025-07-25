import migrationsRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function index(request, response) {
  const dbClient = await database.getNewClient();

  const migrationsDefaultConfig = {
    dbClient: dbClient,
    dir: resolve("infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method == "GET") {
    const pendingMigrations = await migrationsRunner(migrationsDefaultConfig);
    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  }

  if (request.method == "POST") {
    const migratedMigrations = await migrationsRunner({
      ...migrationsDefaultConfig,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
