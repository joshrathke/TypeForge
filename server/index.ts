import { Server } from './server';
import cluster from 'cluster';

// Master Scripts
if (cluster.isMaster) {
    // Get the number of CPUs on the system.
    let CPUCount: number = require('os').cpus().length;
    // Create a worker for each CPU
    for (var i = 0; i < CPUCount; i += 1) cluster.fork();

// Worker Scripts
} else {
    // Instantiate Server Instance
    const _Server = new Server();
}