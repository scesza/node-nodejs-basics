import { spawn } from 'node:child_process';

const spawnChildProcess = async (args) => {
    // create child process
    const child = spawn('node', ['./src/cp/files/script.js', ...args], {
        stdio: ['pipe', 'pipe', process.stderr] // stdin/ stdout of child process are piped
    });

    // redirect stdin of main process to stdin of child process
    process.stdin.pipe(child.stdin);

    // redirect stdout of child process to stdout of main process
    child.stdout.pipe(process.stdout);

    // error handling
    child.on('error', (err) => {
        console.error('Child process error:', err);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['arg1', 'arg2']);
