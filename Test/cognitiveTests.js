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


export function checkTextComplexity(Array) {


    const totalwords = countWordsinSentence(Array);
    const totalSentences = countSentencesInText(Array);
    const averageSyllables = averageSyllablesPerWord(Array);

    Testsyll(Array);
    console.log("TotalW: ", totalwords)
    console.log("TotalS: ", totalSentences)
    console.log("averageSyl: ", averageSyllables)

    const averageWordsPerSentence = totalSentences === 0 ? totalwords : totalwords / totalSentences;

    const FleschReadingEase = 206.835 - (1.015 * averageWordsPerSentence) - (84.6 * averageSyllables)
    //const FleschReadingEase = (0.39*averageWordsPerSentence) + (11.8*averageSyllables) - 15.9
    console.log("FleschReadingEase", FleschReadingEase.toFixed(2))

    if (FleschReadingEase > 100) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und ist somit überhalb der Tabelle. Dieser Text ist sehr einfach zu verstehen.")
    } else if (FleschReadingEase >= 90 && FleschReadingEase <= 100) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Schüler*innen in der 5. amerikansichen Schulstufe verstanden. Dieser Text ist einfach zu verstehen.")
    } else if (FleschReadingEase >= 80 && FleschReadingEase < 90) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Schüler*innen in der 6. amerikansichen Schulstufe verstanden. Dieser Text ist einfach zu verstehen.")
    } else if (FleschReadingEase >= 70 && FleschReadingEase < 80) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Schüler*innen in der 7. amerikansichen Schulstufe verstanden. Dieser Text ist gerade noch einfach zu verstehen.")
    } else if (FleschReadingEase >= 60 && FleschReadingEase < 70) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Schüler*innen in der 8. und 9. amerikansichen Schulstufe verstanden. Dieser Text ist für 13. bis 15. Jährige einfach zu verstehen.")
    } else if (FleschReadingEase >= 50 && FleschReadingEase < 60) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Schüler*innen in der 10. bis 12. amerikansichen Schulstufe verstanden. Dieser Text ist ein wenig Schwierig zu verstehen.")
    } else if (FleschReadingEase >= 30 && FleschReadingEase < 50) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Personen im College verstanden. Dieser Text ist schwierig zu verstehen.")
    } else if (FleschReadingEase >= 10 && FleschReadingEase < 30) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Absolvent*innen des College verstanden. Dieser Text ist sehr schwer zu verstehen.")
    } else if (FleschReadingEase >= 0 && FleschReadingEase < 10) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und wird somit von Absolvent*innen einer Universität verstanden. Dieser Text ist extrem schwer zu verstehen.")
    } else if (FleschReadingEase < 0) {
        console.log("Die Flesch Reading Ease Punktezahl liegt bei", FleschReadingEase.toFixed(2), "und ist somit unterhalb der Tabelle. Dieser Text ist kaum zu verstehen.")
    }
}

function countWordsinSentence(Array) {
    const arrayToString = Array.join("");
    const totalWords = arrayToString.trim().replace(/[.,!?;:()"]/g, '').split(/\s+/).filter(word => word.length > 0);
    return totalWords.length;
}

function countSentencesInText(Array) {
    const arrayToString = Array.join("");
    const regex = /[.!?]/;
    const sentenceCount = arrayToString.split(regex);
    return sentenceCount.length - 1
}

function averageSyllablesPerWord(Array) {
    const arrayToString = Array.join("");
    const textArray = arrayToString.trim().split(/\s+/).filter(word => word.length > 0);
    let countAllSyllable = 0;

    for (let i = 0; i < textArray.length; i++) {
        countAllSyllable += syllable(textArray[i])
    }

    return countAllSyllable / textArray.length
}

function Testsyll(text) {

    text.forEach(element => {
        console.log("JOOO", syllable(element))
    });
    
}

export function checkNumberOfIAOptions(cards) {

    if (cards.length > 7) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten liegt bei ", cards.length, " und fällt somit unter `Nicht Genügend´.")
    } else if (cards.length === 6 || cards.length === 7) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten liegt bei ", cards.length, " und fällt somit unter `Genügend´.")
    } else if (cards.length === 4 || cards.length === 5) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten liegt bei ", cards.length, " und fällt somit unter `Befriedigend.")
    } else if (cards.length === 2 || cards.length === 3) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten liegt bei ", cards.length, " und fällt somit unter `Gut´.")
    } else if (cards.length === 1) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten liegt bei ", cards.length, " und fällt somit unter `Sehr Gut´.")
    }
}

checkNumberOfIAOptions(textArray);
checkTextComplexity(textArray);
Testsyll(textArray);