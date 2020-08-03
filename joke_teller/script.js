const button = document.getElementById('button');
const audioElement = document.getElementById('audio')

function toggleButton() {
    button.disabled = !button.disabled;
}

function sayJoke(joke) {
    VoiceRSS.speech({
        key: '5b1cab51c8ec4d50bb3c1dc6806845e4',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const jokeAPI = `https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Pun`;
    try {
        const response = await fetch(jokeAPI);
        data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        sayJoke(joke);
        // Disable button
        toggleButton();
    } catch(error) {
        console.log(`This isn't very funny,  ${error}`);
        sayJoke(`I'm sorry, my jokes are not working right now. Please try again.`);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
