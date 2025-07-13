const retry = require("async-retry");

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

const orchestrator = {
  waitForAllService,
};

export default orchestrator;
