const express = require('express');
const db = require('./src/common/db');
const apollo = require('./src/common/apollo');
const { startDLQConsumer } = require('./src/dlq/consumer');
const { startLeadConsumer } = require('./src/lead/consumer');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const startServer = async () => {
    try {
        app.get('/health', (req, res) => {
            res.json({ status: 'ok' });
        });

        // Logging middleware
        app.use((req, res, next) => {
            console.log('Request:', req.method, req.url);
            next();
        });
        await db.connect();
        await apollo.startServer(app);
        await startDLQConsumer();
        await startLeadConsumer();
        app.get('/webhook/addlead',(req, res)=>{
            console.log('query',req.query)
           const VERIFY_TOKEN = 'RvXDuO0VthZIUZuEljdhfL3SKbdjMqq7QRty7bFmScqMSJx2Io65WiPML6J6wEvd'

            const mode = req.query['hub.mode']
            const token = req.query['hub.verify_token']
            const challenge = req.query['hub.challenge']

            if (mode && token === VERIFY_TOKEN) {
                console.log('Webhook verified')
                res.status(200).send(challenge)
            } else {
                res.status(403).send('Verification failed')
            }
        })
        app.listen(3004, () => console.log('Server started on port 3004'));
    }catch(e){
        console.log(e)
        throw e;
    }
}
startServer();