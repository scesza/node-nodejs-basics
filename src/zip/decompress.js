import fs from 'fs';
import zlib from 'zlib';

const decompress = async () => {
    const src = 'src/zip/files/archive.gz';
    const dest = 'src/zip/files/fileToCompress.txt';

    try {
        const readable = fs.createReadStream(src);
        const writable = fs.createWriteStream(dest);
        const gunzip = zlib.createGunzip();

        readable.pipe(gunzip).pipe(writable);

        readable.on('error', () => { throw new Error('FS operation failed'); });
        writable.on('error', () => { throw new Error('FS operation failed'); });
    } catch {
        throw new Error('FS operation failed');
    }
};

await decompress();
