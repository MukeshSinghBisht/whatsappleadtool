const express = require('express');
const db = require('./src/common/db');
const apollo = require('./src/common/apollo');
const { startDLQConsumer } = require('./src/dlq/consumer');
const { startLeadConsumer } = require('./src/lead/consumer');
const cors = require('cors');
const app = express();
const startServer = async () => {
    try{
        const corsOptions = {
            origin: 'http://localhost:4000',
            credentials: true
        };

        app.use(express.json());
        app.use(cors(corsOptions));
        await db.connect();
        await apollo.startServer(app);
        await startDLQConsumer();
        await startLeadConsumer();
        app.listen(3000, () => console.log('Server started on port 3000'));
    }catch(e){
        console.log(e)
        throw e;
    }
}
startServer();