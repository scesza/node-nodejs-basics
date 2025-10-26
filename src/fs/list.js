import fs from 'fs/promises';

const list = async () => {
    const dirPath = 'src/fs/files';

    try {
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();
