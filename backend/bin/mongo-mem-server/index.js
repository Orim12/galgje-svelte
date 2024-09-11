const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const path = require('path');

async function startMongoServer() {
    const mongoServer = await MongoMemoryServer.create({
        instance: {
            port: 27017,
            dbName: 'payload',
            dbPath: path.resolve(__dirname, './storage'),
            storageEngine: 'wiredTiger',
        }
    });
    const mongoUri = mongoServer.getUri();
    console.log('MongoDB URI:', mongoUri);
}

startMongoServer();