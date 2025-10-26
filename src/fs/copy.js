import fs from 'fs/promises';

const copy = async () => {
    const srcDir = 'src/fs/files';
    const destDir = 'src/fs/files_copy';

    try {
        // check if source directory exists
        await fs.access(srcDir);

        try {
            await fs.access(destDir);
            // if accessible → target folder already exists
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err; // rethrow if error is not 'not exists'
        }

       // create destination directory
        await fs.mkdir(destDir);

        // read items in source directory
        const items = await fs.readdir(srcDir, { withFileTypes: true });

        // copy each item
        for (const item of items) {
            const srcPath = `${srcDir}/${item.name}`;
            const destPath = `${destDir}/${item.name}`;

            if (item.isFile()) {
                await fs.copyFile(srcPath, destPath);
            } else if (item.isDirectory()) {
                // if has nested directory, create it and copy its files
                await fs.mkdir(destPath);
                const nestedItems = await fs.readdir(srcPath, { withFileTypes: true });
                for (const nestedItem of nestedItems) {
                    const nestedSrc = `${srcPath}/${nestedItem.name}`;
                    const nestedDest = `${destPath}/${nestedItem.name}`;
                    if (nestedItem.isFile()) await fs.copyFile(nestedSrc, nestedDest);
                }
            }
        }

        console.log('Folder copied successfully!');
    } catch {
        throw new Error('FS operation failed');
    }
};

await copy();
