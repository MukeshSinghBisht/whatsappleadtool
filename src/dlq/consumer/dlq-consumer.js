// lead dlq consumer
const kafkaFactory = require('../../common/kafka');
const kafka = kafkaFactory('dlq-consumer');
const dlqConsumer = kafka.consumer({groupId: 'dlq-consumer-group'});
const { processPayload, consumers } = require('../service/dlq.service');
const { processLead } = require('../../lead/service/lead.service');
const startConsumer = async () => {
    await dlqConsumer.connect();
    await dlqConsumer.subscribe({
        topic: consumers.leaddlq,
        fromBeginning: true
    })
    await dlqConsumer.run({
        eachMessage: async ({topic, partition, message})=>{
            await processPayload({lead: JSON.parse(message.value.toString()), mainProcess: processLead, kafka});
        }
        // eachBatch: async ({ batch, heartbeat, resolveOffset, commitOffsetsIfNecessary, isRunning, isStale }) => {
        // for (const message of batch.messages) {
        //     let maxAttempts = 3;
        //     let attempts = 0;
        //     let success = false;

        //     const lead = JSON.parse(message.value.toString());
        //     while (attempts < maxAttempts && !success) {
        //         try {
        //             await mainProcess(lead);
        //             success = true;
        //         } catch (error) {
        //             attempts++;
        //             logger.error(error);
        //             logger.info(`Doing attempt number: ${attempts}`);
        //             await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
        //         }

        //         // 🔥 CRITICAL LINE: keep consumer alive
        //         await heartbeat();
        //     }

        //     if (!success) {
        //         logger.info(`🚫 Lead ${lead.leadId} is not valid`);
        //         logger.info(`lead moved to dlq in db`);
        //         await saveDlq(lead);
        //     }

        //     // ✅ Mark message offset processed
        //     resolveOffset(message.offset);
        //     await commitOffsetsIfNecessary();
        // }
        // }
    })
}
module.exports = {
    startConsumer
}
