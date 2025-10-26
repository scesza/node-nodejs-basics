import fs from 'fs';

const write = async () => {
    const filePath = 'src/streams/files/fileToWrite.txt';

    try {
        const writableStream = fs.createWriteStream(filePath);
        process.stdin.pipe(writableStream);

        writableStream.on('error', () => {
            throw new Error('FS operation failed');
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await write();
