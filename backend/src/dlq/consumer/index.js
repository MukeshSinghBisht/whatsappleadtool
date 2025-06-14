const { startConsumer } = require('./dlq-consumer');
const { connect } = require('../../common/db');
(async () => {
    try {
        await connect()
        await startConsumer()
    } catch (error) {
        console.log(error)
    }
})()
