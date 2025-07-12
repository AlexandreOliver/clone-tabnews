const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handlerReturn);

  function handlerReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      //setTimeout(checkPostgres, 250);
      checkPostgres();
      return;
    }

    console.log("\n🟢 - Postgres está recebendo conexões\n");
  }
}

process.stdout.write("🔴 - Aguardando Postgres aceitar conexões ");
checkPostgres();
