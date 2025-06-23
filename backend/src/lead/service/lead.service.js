const Lead = require('../models/lead')
const { logger } = require('../../common/logger');
const { leadsProcessed } = require('../../common/metric');
const { produceLeadEvent } = require('../producer');
async function leadExists(leadId){
    try{
        const leadexist = await Lead.findOne({leadId: leadId})
        if(leadexist){
            console.log(`Lead ${leadId} already processed`);
            return true;
        }
        return false;
    }catch(e){
        console.log(e)
        throw e;
    }
}

async function saveLead(lead, metric){
    try{
        await Lead.create(lead)
        updateLeadInkafka(metric);
    }catch(e){
        console.log(e)
        throw e;
    }
}

async function updateLeadInkafka(metric){
    try{
        metric.inc();
    }catch(e){
        console.log(e)
        throw e;
    }
}
async function processLead(lead){
    try{
        if(lead.leadId){
            // check in db if leadid exist , if no then save it and process, and if alrady esxit then return
            const leadexist = await leadExists(lead.leadId)
            if(leadexist){
                console.log(`Lead ${lead.leadId} already processed`);
                return;
            }
        }
        if(!lead.phone.startsWith('+91')){
            throw new Error('Invalid phone number');
        }
        logger.info(`📤 Sending email to ${lead.phone}...`);
        logger.info(`📩 Message: Thank you ${lead.name}, we got your request: "${lead.message}"`);  
        await saveLead(lead, leadsProcessed);
    }catch(e){
        console.log(e)
        throw e;
    }
}

async function getLeads(){
    try{
        return await Lead.find()
    }catch(e){
        console.log(e)
        throw e;
    }
}

async function createLead({ name, phone, message, leadId }) {
    const newLead = new Lead({ name, phone, message, leadId });
    await newLead.save();
    
    // Optional: You can also produce kafka event here if you want
    // await produceLeadKafkaEvent(newLead);
    await produceLeadEvent(newLead);
    return newLead;
}

module.exports = {
    processLead,
    getLeads,
    createLead
}
