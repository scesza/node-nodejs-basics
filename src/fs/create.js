import fs from 'fs/promises';

const create = async () => {
    const dirPath = `src/fs/files`;
    const filePath = `${dirPath}/fresh.txt`;

    // 1️⃣ Убедимся, что папка существует
    await fs.mkdir(dirPath, { recursive: true });

    try {
        // 2️⃣ Проверяем, существует ли файл
        await fs.access(filePath);
        // Если доступен → файл уже есть
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            // Файла нет → создаём
            await fs.writeFile(filePath, 'I am fresh and young');
            console.log('File created successfully');
        } else {
            // Любая другая ошибка → выбрасываем
            throw new Error('FS operation failed');
        }
    }
};

await create();
