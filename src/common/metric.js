const client = require('prom-client');
const express = require('express');
const register = client.register;
client.collectDefaultMetrics({register})
const leadsProcessed = new client.Counter(
    { name: 'leads_processed_total',
      help: 'Total number of leads processed'
    }
)
const leadsDlQueued = new client.Gauge(
    { name: 'leads_dl_queued_total',
      help: 'Total number of leads in dl queue'
    }
)

register.registerMetric(leadsProcessed)
register.registerMetric(leadsDlQueued)

const metricApp = express()
metricApp.get('/metrics', async (req, res)=>{
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
})
const startRegisterMetricServer = () =>{
    metricApp.listen(9100, ()=>{
        console.log('metric server started on port 9100')
    })
}

module.exports= {
    startRegisterMetricServer,
    leadsProcessed,
    leadsDlQueued
}