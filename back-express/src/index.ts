import express = require('express');
import { exit } from 'process';
import { DataManager } from './utils/dataManager';

const dataManager = new DataManager('data/metering_data.csv');
const loadSucceed = dataManager.loadData();

if (loadSucceed === false) {
    console.error("Error while loading data");
    exit(1);
}

const app = express();
const hostname = '0.0.0.0';
const port = 8080;

app.listen(port);
console.log(`Server start hostname ${hostname}:${port}`);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send({
        'message': "Welcome to the Plug'heur exercice API"
    })
});

app.get('/serials', (req, res) => {
    const listSerials = dataManager.getSerialNumbers();
    res.send({
        data: listSerials,
        count: listSerials.length
    });
})

app.get('/serials/:serialNumber/metrics', (req, res) => {
    const { serialNumber } = req.params;
    if (!dataManager.checkSerialNumberExist(serialNumber)) {
        res.status(404).send({
            'message': "This serial number not found"
        });
        return;
    }
    const metrics = dataManager.getMetricsBySerialNumber(serialNumber);
    res.send({
        serial: serialNumber,
        metrics: metrics
    });
})