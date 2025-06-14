const Dlq = require('../models/dlq')
const { logger } = require('../../common/logger');
const { sendToDlq } = require('../producer/index');

async function addToDlq(payload, metric, topic){
    try{
        await sendToDlq(payload, topic)
        await syncDlqCount(metric);
    }catch(e){
        console.log(e)
        logger.error(e)
        throw e;
    }
}
async function processPayload({lead, mainProcess, kafka}){
    let maxAttempts = 3;
    let attempts = 0;
    let success = false;
    while(attempts < maxAttempts && !success){
        logger.info('new lead message received', lead)
        try {
            await mainProcess(lead)
            success = true;
        } catch (error) {
            attempts++;
            logger.error(error)
            kafka.logger().error(error)
            logger.info(`doin attempt number: ${attempts} for lead ${lead.leadId}`);
            await new Promise((resolve)=> setTimeout(resolve,1000*attempts)) //exponential backoff
        }
    }
    if(!success){
        logger.info(`🚫 Lead ${lead.leadId} is not valid`);
        logger.info(`lead moved to dlq in db`);
        lead = typeof lead === 'object' ? JSON.stringify(lead) : lead;
        await saveDlq(lead) // storing in db for longer persistnance and retry, or manual intervention
    }
}

async function syncDlqCount(metric){
    const count = await Dlq.countDocuments(); //todo fix this
    metric.set(count)
}

async function restoreDlqCountOnStartup(metric){
    await syncDlqCount(metric);
}
const consumers = {
    leaddlq: 'lead-dlq'
}
async function saveDlq(payload){
    try{
        await Dlq.create({ payload })
    }catch(e){
        console.log(e)
        logger.error(e)
        throw e;
    }
}
module.exports = {
    addToDlq,
    restoreDlqCountOnStartup,
    consumers,
    processPayload
}