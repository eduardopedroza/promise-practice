// let baseURL = 'http://numbersapi.com/';



// axios
//     .get(`${baseURL}19/`)
//     .then(response => {
//         console.log(response);
//         console.log(response.data)
//     })

// let facts = []


// facts.push(
//     axios.get(`${baseURL}3..13/`)
// )

// Promise.all(facts)
//     .then(factsArr => {
//         const factsObj = factsArr[0].data;
//         for (const key in factsObj) {
//             let paragraph = document.createElement('p');
//             paragraph.innerText = `${key}: ${factsObj[key]}`
//             let body = document.getElementById('body');
//             body.appendChild(paragraph);
//         }
//     })


// let promises = [
//     axios.get(`${baseURL}19/`),
//     axios.get(`${baseURL}19/`),
//     axios.get(`${baseURL}19/`),
//     axios.get(`${baseURL}19/`)
// ];

// Promise.all(promises)
//     .then(responses => {
//         responses.forEach(response => {
//             let p = document.createElement('p');
//             p.innerText = response.data;
//             let body = document.getElementById('body');
//             body.appendChild(p);
//         });
//     })
//     .catch(error => console.error('Error:', error));


let baseURL = 'https://deckofcardsapi.com/api/'

// axios
//     .get(`${baseURL}deck/new/draw/?count=1`)
//     .then(response => {
//         console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
//     })



// axios.get(`${baseURL}deck/new/shuffle/?deck_count=1`)
//     .then(response => {
//         const deckId = response.data.deck_id;

//         // Draw the first card
//         return axios.get(`${baseURL}deck/${deckId}/draw/?count=1`);
//     })
//     .then(response => {
//         let card1 = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;

//         // Draw the second card
//         return axios.get(`${baseURL}deck/${response.data.deck_id}/draw/?count=1`)
//                     .then(response => {
//                         let card2 = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;
//                         console.log(`${card1}, ${card2}`);
//                     });
//     })
//     .catch(error => console.error('Error:', error));


let deck = {};
let remaining = 0;


function getNewDeck() {
    axios
        .get(`${baseURL}deck/new/shuffle/?deck_count=1`)
        .then(response => {
            deck = response.data;
            remaining = deck.remaining;
        })
}

$(function() {
    getNewDeck();

    $('#draw-card').on('click', function(e) {
        e.preventDefault();  
        if(remaining > 0){
            axios
                .get(`${baseURL}deck/${deck.deck_id}/draw/?count=1`)
                .then(response => {
                    $('#card-images').append(`<img src="${response.data.cards[0].image}">`);
                    console.log(remaining);
                    remaining--;
                })
        }
    })
}) 

