import fs from 'fs/promises';

const remove = async () => {
    const filePath = 'src/fs/files/fileToRemove.txt';

    try {
        await fs.rm(filePath, { force: false });
        console.log('File deleted successfully!');
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
