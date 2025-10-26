const parseEnv = () => {
    // get all environment variables
    const env = process.env;

    // filter only those that start with RSS_
    const rssVars = Object.entries(env)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`);

    console.log(rssVars.join('; '));
};

parseEnv();
