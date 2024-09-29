import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const getPowerDisciplineDescription = async (discipline, power) => {
    console.log("HELLO?")
    const { stdout, stderr } = await execPromise(`bash ./fetch_document/script.sh ${discipline} ${power}`);
    console.log(stdout)
    console.log(stderr)
    const rawData = readFileSync('./fetch_document/getPower.json');
    const jsonObject = JSON.parse(rawData);
    const description = `
    ### ${jsonObject['Discipline']}: ${jsonObject['Power']}
    - Description: ${jsonObject['Description']}
    - Source: ${jsonObject['Source']}
    - Amalgam: ${jsonObject['Amalgam']}
    - System: ${jsonObject['System']}
    - Dice Pool: ${jsonObject['Dice Pool']}
    - Duration: ${jsonObject['Duration']}
    `
    return description;
}