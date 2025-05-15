import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syllable } from "syllable"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../extracted_data/text/politic_data_options_Title.json');

const raw = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(raw);

const textArray = data.map(entry => entry.text);

function countWord(arrayofWords){
    const deleteKey = arrayofWords.trim();

    
}