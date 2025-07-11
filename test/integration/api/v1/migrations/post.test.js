test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response1.status).toBe(201);

  const resBody1 = await response1.json();
  expect(resBody1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response2.status).toBe(200);

  const resBody2 = await response2.json();
  expect(resBody2.length).toBe(0);
});
