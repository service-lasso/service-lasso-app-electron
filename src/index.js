import { startApiServer } from "@service-lasso/service-lasso";
import { once } from "node:events";
import { resolveElectronConfig, validateElectronConfig } from "./config.js";
import { createElectronHostServer } from "./server.js";
import { prepareStarterServicesRoot } from "./services-root.js";

async function closeServer(server) {
  server.close();
  await once(server, "close");
}

async function main() {
  const config = await validateElectronConfig(resolveElectronConfig());

  console.log(`[app-electron] booting Service Lasso runtime on ${config.runtimeUrl}`);
  console.log(`[app-electron] servicesRoot=${config.servicesRoot}`);
  console.log(`[app-electron] workspaceRoot=${config.workspaceRoot}`);

  const preparedServices = await prepareStarterServicesRoot(config);
  console.log(`[app-electron] prepared Echo Service wrapper at ${preparedServices.wrapperManifestPath}`);
  console.log(`[app-electron] electron config target path ${config.electronConfigPath}`);

  const runtime = await startApiServer({
    port: config.runtimePort,
    servicesRoot: config.servicesRoot,
    workspaceRoot: config.workspaceRoot,
  });

  const hostServer = createElectronHostServer(config);
  hostServer.listen(config.hostPort, "127.0.0.1");
  await once(hostServer, "listening");

  console.log(`[app-electron] desktop shell ready at ${config.hostUrl}`);
  console.log(`[app-electron] admin UI embedded from ${config.adminUrl}`);
  console.log(`[app-electron] runtime API ready at ${runtime.url}`);

  let stopping = false;

  async function shutdown(signal) {
    if (stopping) {
      return;
    }

    stopping = true;
    console.log(`[app-electron] shutting down after ${signal}`);

    await closeServer(hostServer);
    await runtime.stop();
  }

  process.on("SIGINT", () => {
    void shutdown("SIGINT").finally(() => {
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM").finally(() => {
      process.exit(0);
    });
  });
}

await main();
