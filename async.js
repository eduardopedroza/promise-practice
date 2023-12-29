// let baseURL = 'http://numbersapi.com/'

// async function getFavFact() {
//     let numData = await $.getJSON(`${baseURL}19?json`);
//     console.log(numData.text);
// }

// getFavFact();

// async function multipleFacts() {
//     let numData = await $.getJSON(`${baseURL}1..5?json`);
//     for (let num in numData){
//         console.log(`${num}: ${numData[num]}`);
//     }
// }

// multipleFacts();

// async function fourFavFacts() {
//     let facts = await Promise.all([
//         $.getJSON(`${baseURL}19?json`),
//         $.getJSON(`${baseURL}19?json`),
//         $.getJSON(`${baseURL}19?json`),
//         $.getJSON(`${baseURL}19?json`)
//     ])

//     for (let fact in facts){
//         console.log(facts[fact].text);
//     }
// }

// fourFavFacts();

let baseURL = 'https://deckofcardsapi.com/api/'

// async function getCard() {
//     let card = await $.getJSON(`${baseURL}deck/new/draw/?count=1`);
//     console.log(`${card.cards[0].value} of ${card.cards[0].suit}`);
// }

// getCard();

// async function getTwoCards() {
//     let deck = await $.getJSON(`${baseURL}deck/new/shuffle/?deck_count=1`);
//     let card1 = await $.getJSON(`${baseURL}deck/${deck.deck_id}/draw?count=1`);
//     let card2 = await $.getJSON(`${baseURL}deck/${deck.deck_id}/draw?count=1`);
//     console.log(`${card1.cards[0].value} of ${card1.cards[0].suit}`)
//     console.log(`${card2.cards[0].value} of ${card2.cards[0].suit}`)
// }

// getTwoCards();

let deckId = "";
let remaining = 0;

async function getNewDeck() {
    let deck = await $.getJSON(`${baseURL}deck/new/shuffle/?deck_count=1`);
    deckId = deck.deck_id;
    remaining = deck.remaining;
}

async function draw(deckId){
    let card =  await $.getJSON(`${baseURL}deck/${deckId}/draw?count=1`);
    remaining--;
    return card.cards[0].image;
}

$(function() {
    getNewDeck().then(() => {
        $('#get-card').on('click', async function(e) {
            e.preventDefault();
            if(remaining > 0){
                let imageURL = await draw(deckId);
                $('#cards').append(`<img src="${imageURL}">`);
            }
        });
    });
});