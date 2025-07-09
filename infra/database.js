import pg from "pg";

async function query(query) {
  const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  try {
    await client.connect();
    var result = await client.query(query);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }

  return result;
}

export default {
  query: query,
};
