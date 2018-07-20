import cluster from "cluster";
import fs from "fs";
import OperatingSystem from "os";
import { Server } from "./server.class";

// Retrieve Forge Configuration
const forgeConfig = JSON.parse(fs.readFileSync("forgeconfig.json", "utf8"));

// Master Scripts
if (cluster.isMaster) {
    // Get the number of CPUs on the system.
    const CPUCount: number = forgeConfig && forgeConfig.multithreading ? OperatingSystem.cpus().length : 1;
    // Create a worker for each CPU
    for (let i = 0; i < CPUCount; i++) { cluster.fork(); }

    cluster.on("exit", (worker, code, signal) => cluster.fork());

// Worker Scripts
} else {
    // Instantiate Server Instance
    const server = new Server().bootstrap();
}
