import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syllable } from "syllable"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../extracted_data/text/weekdayFour.json');
const filePathTwo = path.join(__dirname, '../extracted_data/text/weekdayTwo.json');
const filePathThree = path.join(__dirname, '../extracted_data/text/weekdayThree.json');
const filePathFour = path.join(__dirname, '../extracted_data/text/weekdayFour.json');


const raw = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(raw);

const rawTwo = fs.readFileSync(filePathTwo, 'utf-8');
const dataTwo = JSON.parse(rawTwo);

const rawThree = fs.readFileSync(filePathThree, 'utf-8');
const dataThree = JSON.parse(rawThree);

const textArray = data.map(entry => entry.firstOption);
const textArrayTwo = dataTwo.map(entry => entry.firstOption);
const textArrayThree = dataThree.map(entry => entry.firstOption);



export function checkTextComplexity(Array) {

    const totalwords = countWordsinSentence(Array);
    const averageSyllables = averageSyllablesPerWord(Array);
    const totalSentences = countSentence(Array);

    /*Testsyll(Array);
    console.log("TotalW: ", totalwords)
    console.log("TotalS: ", totalSentences)
    console.log("averageSyl: ", averageSyllables)*/

    const averageWordsPerSentence = totalSentences === 0 ? totalwords : totalwords / totalSentences;

    const FleschReadingEase = 206.835 - (1.015 * averageWordsPerSentence) - (84.6 * averageSyllables)

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
    const countedWords = Array.reduce((count, sentence) => {
        const reduceSpecialCharacter = sentence.trim().replace(/[.,!?;:()"0123456789]/g, '');
        const words = reduceSpecialCharacter.split(/\s+/).filter(word => word.length > 0);
        return count + words.length
    }, 0)

    return countedWords;
}

function countSentence(Array){
    const sentenceString = /([!?\.]+)/g;
    let countSentence = 0;
    Array.forEach(element => {
        const matches = element.match(sentenceString)
        if (matches){
            countSentence += matches.length
        }
    })
    return countSentence;
}

function averageSyllablesPerWord(Array) {
    let allWords = [];
    let allSyllables = 0;

    Array.forEach(sentence => {
        const words = sentence.replace(/[.,!?;:()0123456789"]/g, '').split(/\s+/).filter(word => word.length > 0);
        allWords.push(...words)
    })

    for (let i = 0; i < allWords.length; i++) {
        allSyllables += syllable(allWords[i]);
    }

    return allWords.length > 0 ? allSyllables / allWords.length : 0;
}

/*function Testsyll(text) {

    text.forEach(element => {
        console.log("JOOO", syllable(element))
    });

}*/


export function checkaverageInformation(firstTitle, secondTitle, menuOptions){

    console.log(firstTitle.length);
    console.log(secondTitle.length);
    console.log(menuOptions.length);

    const averageMenuTitle = firstTitle.length === 0 ? secondTitle.length : secondTitle.length / firstTitle.length;

    if (averageMenuTitle > 7) {
        console.log("Die Anzahl der Filterüberschriften pro Überauswahl liegt bei ", averageMenuTitle, " und fällt somit unter `Nicht Genügend´.")
    } else if (averageMenuTitle > 6 || averageMenuTitle < 7) {
        console.log("Die Anzahl der Filterüberschriften pro Überauswahl liegt bei ", averageMenuTitle, " und fällt somit unter `Genügend´.")
    } else if (averageMenuTitle > 4 || averageMenuTitle < 5) {
        console.log("Die Anzahl der Filterüberschriften pro Überauswahl liegt bei ", averageMenuTitle, " und fällt somit unter `Befriedigend.")
    } else if (averageMenuTitle > 2 || averageMenuTitle < 3) {
        console.log("Die Anzahl der Filterüberschriften pro Überauswahl liegt bei ", averageMenuTitle, " und fällt somit unter `Gut´.")
    } else if (averageMenuTitle > 1) {
        console.log("Die Anzahl der Filterüberschriften pro Überauswahl liegt bei ", averageMenuTitle, " und fällt somit unter `Sehr Gut´.")
    }
    const averageInfoNumber = secondTitle.length === 0 ? menuOptions.length : menuOptions.length / secondTitle.length;

      if (averageInfoNumber > 7) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten pro Überschrift liegt bei ", averageInfoNumber, " und fällt somit unter `Nicht Genügend´.")
    } else if (averageInfoNumber > 6 || averageInfoNumber < 7) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten pro Überschrift liegt bei ", averageInfoNumber, " und fällt somit unter `Genügend´.")
    } else if (averageInfoNumber > 4 || averageInfoNumber < 5) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten pro Überschrift liegt bei ", averageInfoNumber, " und fällt somit unter `Befriedigend.")
    } else if (averageInfoNumber > 2 || averageInfoNumber < 3) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten pro Überschrift liegt bei ", averageInfoNumber, " und fällt somit unter `Gut´.")
    } else if (averageInfoNumber > 1) {
        console.log("Die Anzahl der Filterauswahlmöglichkeiten pro Überschrift liegt bei ", averageInfoNumber, " und fällt somit unter `Sehr Gut´.")
    }
}

checkaverageInformation(textArray, textArrayTwo, textArrayThree)
checkTextComplexity(textArray);
