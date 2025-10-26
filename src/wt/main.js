import { Worker } from 'node:worker_threads';
import os from 'os';

const performCalculations = async () => {
    const numCores = os.cpus().length; // number of CPU cores

    const promises = [];

    for (let i = 0; i < numCores; i++) {
        const n = 10 + i; // incremental number starting from 10

        const promise = new Promise((resolve) => {
            const worker = new Worker(new URL('./worker.js', import.meta.url), { workerData: { n } });

            worker.on('message', (result) => {
                resolve({ status: 'resolved', data: result });
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });

        promises.push(promise);
    }

    const settledResults = await Promise.all(promises);
    console.log(settledResults);
};

await performCalculations();
