"use strict";
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
const form = document.querySelector('form');
const input = document.querySelector(".word-field");
const containerWord = document.querySelector('h2');
const resultWrapper = document.querySelector('.result-word');
const btnSound = document.querySelector('button');
let state = {
    word: '',
    meanings: [],
    phonetics: []
};
function handlerSubmit(e) {
    e.preventDefault();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${state.word}`)
        .then((response) => {
        // console.log(response)
        return response.json();
    })
        .then(data => {
        console.log(data);
        state.meanings = data[0].meanings;
        state.phonetics = data[0].phonetics;
        insertWord();
        showResult();
    });
}
function showResult() {
    if (resultWrapper) {
        resultWrapper.innerHTML = '';
        state.meanings.forEach((item) => {
            resultWrapper.innerHTML += `
                <div>
                   <h3>${item.partOfSpeech}</h3> 
                   <ul>
                        ${getDefinitions(item.definitions)}
                   </ul>
                </div>
            `;
        });
    }
}
function getDefinitions(definitions) {
    return definitions.map((itemDefinition) => {
        return `<li> ${itemDefinition.definition} </li>`;
    }).join('');
}
function insertWord() {
    if (containerWord) {
        containerWord.innerHTML = state.word;
    }
}
function handleKeyUp(e) {
    // const value = (e.target as HTMLInputElement).value;
    const value = e.target.value;
    state.word = value;
}
function handleSound() {
    const sound = state.phonetics[0];
    if (sound.audio) {
        new Audio(sound.audio).play();
    }
    else {
        alert('Немає запису звучання');
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', handlerSubmit);
input === null || input === void 0 ? void 0 : input.addEventListener('keyup', handleKeyUp);
btnSound === null || btnSound === void 0 ? void 0 : btnSound.addEventListener('click', handleSound);
