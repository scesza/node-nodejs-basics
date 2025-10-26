const parseArgs = () => {
    // take arguments from command line excluding the first two default ones
    const args = process.argv.slice(2);

    const result = [];

    for (let i = 0; i < args.length; i += 2) {
        // remove leading '--' from argument name
        const prop = args[i].replace(/^--/, '');
        const value = args[i + 1];
        result.push(`${prop} is ${value}`);
    }

    console.log(result.join(', '));
};

parseArgs();
