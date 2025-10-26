import fs from 'fs';

const read = async () => {
    const filePath = 'src/streams/files/fileToRead.txt';

    try {
        const stream = fs.createReadStream(filePath, 'utf-8');
        stream.pipe(process.stdout);

        stream.on('error', () => {
            throw new Error('FS operation failed');
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
