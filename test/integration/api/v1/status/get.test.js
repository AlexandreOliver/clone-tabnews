import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllService();
});

describe("GET /api/v1/status/", () => {
  describe("Anonymous User", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      const parsedUpdateAt = new Date(responseBody.update_at).toISOString();

      expect(responseBody.update_at).toEqual(parsedUpdateAt);

      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.connections_opening).toEqual(1);
    });
  });
});
