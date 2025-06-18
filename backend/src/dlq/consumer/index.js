const { startConsumer } = require('./dlq-consumer');
const { connect } = require('../../common/db');
const startDLQConsumer = async () => {
    try {
        await connect()
        await startConsumer()
    } catch (error) {
        console.log(error)
    }
}
module.exports = { startDLQConsumer };