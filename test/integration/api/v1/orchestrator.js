import retry from "async-retry";
import database from "infra/database";

async function waitForAllService() {
  await awaitForWebService();
}

async function awaitForWebService() {
  return retry(fetchStatusPage, {
    retries: 100,
    minTimeout: 100,
    maxTimeout: 500,
  });
}
async function fetchStatusPage() {
  const response = await fetch("http://localhost:3000/api/v1/status");

  if (response.status !== 200) {
    throw Error();
  }
}

async function clearDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC");
}
const orchestrator = {
  waitForAllService,
  clearDatabase,
};

export default orchestrator;
