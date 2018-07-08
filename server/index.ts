import { Server } from './server';
import cluster from 'cluster';
import fs from 'fs';

// Retrieve Forge Configuration
const forgeConfig = JSON.parse(fs.readFileSync('forgeconfig.json', 'utf8'));

// Master Scripts
if (cluster.isMaster) {
    // Get the number of CPUs on the system.
    let CPUCount: number = forgeConfig && forgeConfig.multithreading ? require('os').cpus().length : 1;
    // Create a worker for each CPU
    for (let i = 0; i < CPUCount; i++) cluster.fork();

    cluster.on('exit', (worker, code, signal) => cluster.fork());

// Worker Scripts
} else {
    // Instantiate Server Instance
    const _Server = new Server();
}