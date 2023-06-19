// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

interface itemMeanings{
    partOfSpeech: string;
    definitions: definitions[];
}

interface Sound{
    audio: string;
}

interface definitions {
    definition: string;
}

const form: HTMLFormElement | null = document.querySelector('form');
const input = <HTMLInputElement>document.querySelector(".word-field");
const containerWord: HTMLHeadingElement | null = document.querySelector('h2');
const resultWrapper = document.querySelector('.result-word');
const btnSound = document.querySelector('button');

let state = {
    word: '',
    meanings: [],
    phonetics: []
}

function handlerSubmit(e: Event){
    e.preventDefault();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${state.word}`)
        .then((response: Response) => {
            // console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data);
            state.meanings = data[0].meanings;
            state.phonetics = data[0].phonetics;
            insertWord();
            showResult();
        })
}

function showResult(){
    if(resultWrapper){
        resultWrapper.innerHTML = '';

        state.meanings.forEach((item: itemMeanings) => {
            resultWrapper.innerHTML += `
                <div>
                   <h3>${item.partOfSpeech}</h3> 
                   <ul>
                        ${ getDefinitions(item.definitions) }
                   </ul>
                </div>
            `;
        })
    }
}

function getDefinitions(definitions: definitions[]){
    return definitions.map((itemDefinition) => {
        return `<li> ${itemDefinition.definition} </li>`
    }).join('')
}

function insertWord(){
    if(containerWord){
        containerWord.innerHTML = state.word;
    }
}

function handleKeyUp(e: Event){
    // const value = (e.target as HTMLInputElement).value;
    const value = (<HTMLInputElement>e.target).value;

    state.word = value;
}

function handleSound(){
    const sound: Sound = state.phonetics[0];

    if(sound.audio){
        new Audio(sound.audio).play();
    } else {
        alert('Немає запису звучання')
    }
}

form?.addEventListener('submit', handlerSubmit);
input?.addEventListener('keyup', handleKeyUp);
btnSound?.addEventListener('click', handleSound);