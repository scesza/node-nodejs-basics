import fs from 'fs/promises';

const rename = async () => {
    const dirPath = `src/fs/files`;
    const srcFile = `${dirPath}/wrongFilename.txt`;
    const destFile = `${dirPath}/properFilename.md`;

    try {
        await fs.access(srcFile);
        try {
            await fs.access(destFile);
            throw new Error('FS operation failed'); // destination file exists
        } catch (err) {
            if (err.code !== 'ENOENT') throw new Error('FS operation failed');
        }
        await fs.rename(srcFile, destFile);
        console.log('File renamed successfully!');
    } catch {
        throw new Error('FS operation failed');
    }
};

await rename();
