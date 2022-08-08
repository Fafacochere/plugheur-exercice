const fs = require('fs');

const SERIAL_INDEX = 0;
const WH_INDEX = 2;
const VARH_INDEX = 3;

export class DataManager {
    private filepath:string;
    private data: Array<string[]>;
    private serialNumbers: Array<string> = [];

    constructor(filepath: string) {
        this.filepath = filepath;
    }

    loadData = () => {
        try {
            this.data = this.readFile();
            this.loadSerialNumbersFromData();
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    getSerialNumbers = (): Array<string> => {
        return this.serialNumbers;
    }

    checkSerialNumberExist = (serialNumber: string) => {
        return this.serialNumbers.includes(serialNumber);
    }

    getMetricsBySerialNumber = (serialNumber: string) => {
        return this.data
        .filter(metric => metric[SERIAL_INDEX] === serialNumber)
        .map((index) => {
            const copy = [...index]
            copy.splice(SERIAL_INDEX, 1)
            return copy;
        })
    }

    private loadSerialNumbersFromData = () => {
        for(const metric of this.data) {
            if(metric[0] && this.serialNumbers.indexOf(metric[SERIAL_INDEX]) < 0) {
                this.serialNumbers.push(metric[0]);
            }
        }
    }


    private readFile = () => {
        const data = fs.readFileSync(this.filepath, 'utf8').toString().split('\n');
        data.shift();
        return data.map((item: string) => item.split(','));
    }
} 