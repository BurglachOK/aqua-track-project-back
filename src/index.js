import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const Start = async () => {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

Start();
