const { startRegisterMetricServer, leadsDlQueued } = require('../../common/metric');
const { connect } = require('../../common/db');
const { restoreDlqCountOnStartup } = require('../../dlq/service/dlq.service');
const { startConsumer } = require('./kakfka-consumer');
const startLeadConsumer = async () => {
    try {
        await connect() // db
        await restoreDlqCountOnStartup(leadsDlQueued) // dlq
        startRegisterMetricServer() // metrics
        await startConsumer() // consumer
    } catch (error) {
        console.log(error)
    }
}
module.exports = { startLeadConsumer };

