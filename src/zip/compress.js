import fs from 'fs';
import zlib from 'zlib';

const compress = async () => {
    const src = 'src/zip/files/fileToCompress.txt';
    const dest = 'src/zip/files/archive.gz';

    const readable = fs.createReadStream(src);
    const writable = fs.createWriteStream(dest);
    const gzip = zlib.createGzip();

    readable.pipe(gzip).pipe(writable);

    readable.on('error', () => { throw new Error('FS operation failed'); });
    writable.on('error', () => { throw new Error('FS operation failed'); });
};

await compress();
