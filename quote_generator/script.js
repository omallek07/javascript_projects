const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    let data;
    try {
        const response = await fetch(proxyUrl + apiUrl);
        data = await response.json();
    } catch (error) {
        console.log('error', error);
        // Dummy Quote if API Error
        data = {
            quoteText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptas dignissimos incidunt veniam consequuntur, nesciunt culpa laboriosam facere modi officia! Delectus illo omnis error obcaecati exercitationem dolorum tenetur nesciunt similique.',
            quoteAuthor: 'Kevin',
        }
    }
    authorText.innerText = data.quoteAuthor === '' ? 'Unknown' : data.quoteAuthor;
    
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();