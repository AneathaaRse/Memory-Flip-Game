
const cards = document.querySelectorAll(".card");
let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.currentTarget;

    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }

        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard === 8) {
            setTimeout(shuffleCards, 1000);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        resetCards();
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            resetCards();
        }, 1200);
    }
}

function resetCards() {
    cardOne = cardTwo = null;
    disableDeck = false;
}

function shuffleCards() {
    matchedCard = 0;
    cardOne = cardTwo = null;
    disableDeck = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `assests/image${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCards();

cards.forEach(card => card.addEventListener("click", flipCard));

let score = 0;

// Function to update the score
function updateScore() {
    score++;
    document.getElementById('score').textContent = score;
}

// Add event listeners to cards (or any interaction)
const card = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', function() {
        // Add your card-flipping or other game logic here

        // Update score when a card is clicked
        updateScore();
    });
});

// Reset Button Logic
document.getElementById('reset-btn').addEventListener('click', function() {
    // Reset score to 0
    score = 0;
    document.getElementById('score').textContent = score;

    // Reset card states (if applicable)
    cards.forEach(card => {
        // Add logic to reset the card's state, if needed
    });
});
