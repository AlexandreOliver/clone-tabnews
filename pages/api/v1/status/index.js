import database from "/infra/database";

async function index(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum");
  response.status(200).json({ tex: "aaaaaaaaaa" });

  console.log(result.rows[0]);
}

export default index;
