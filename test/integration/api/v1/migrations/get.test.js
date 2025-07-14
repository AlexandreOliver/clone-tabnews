import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const resBody = await response.json();
      expect(resBody.length).toBeGreaterThan(0);
    });
  });
});
