import orchestrator from "../orchestrator";
import database from "infra/database";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response.status).toBe(201);

        const resBody1 = await response.json();
        expect(resBody1.length).toBeGreaterThan(0);
      });

      test("For the Second time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response.status).toBe(200);

        const resBody2 = await response.json();
        expect(resBody2.length).toBe(0);
      });
    });
  });
});
