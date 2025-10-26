import fs from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
    const filePath = 'src/hash/files/fileToCalculateHashFor.txt';

    try {
        // create read stream
        const stream = fs.createReadStream(filePath);

        // create hash object
        const hash = crypto.createHash('sha256');

        // stream piping
        stream.on('data', chunk => hash.update(chunk));

        stream.on('end', () => {
            const result = hash.digest('hex');
            console.log(result);
        });

        stream.on('error', () => {
            throw new Error('FS operation failed');
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await calculateHash();
