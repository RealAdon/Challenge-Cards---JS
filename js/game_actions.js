let game = new Challenge();

function checkStateOfChallenge() {
    state = game.deck.checkStateOfChallenge();
    if (data.state == 'won') {
        alert("You won the game!");
        window.location.href = '/';
    } else if (data.state == 'lost') {
        alert("You lost the game!");
        window.location.href = '/';
    } else if (data.state == 'draw') {
        document.getElementById('deck').style.backgroundColor = '';
    }
}

document.getElementById('start-button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    game.newGame();
    console.log(game);
    game.deck.hand.cards.forEach(function(card) {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-card', card);
        cardDiv.textContent = card;
        hand.appendChild(cardDiv);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    let selectedCard = null;

    // Delegate card clicks from the #hand section
    document.getElementById('hand').addEventListener('click', function(event) {
        if (event.target.classList.contains('card')) {
            // Deselect any previously selected card
            document.querySelectorAll('.card.selected').forEach(card => {
                card.classList.remove('selected');
            });
            // Select this card
            event.target.classList.add('selected');
            selectedCard = event.target.getAttribute('data-card');
        }
    });

    // Delegate pile clicks from the #piles section
    document.getElementById('piles').addEventListener('click', function(event) {
        if (event.target.classList.contains('pile') && selectedCard !== null) {
            let pile = event.target.getAttribute('data-pile');
            let success = game.deck.playCard(selectedCard, pile);
            console.log(success)
            if (success) {
                // Remove the selected card from the hand
                document.querySelector('.card.selected').remove();
                // Update the text of the pile
                event.target.textContent = selectedCard;
                selectedCard = null; // Reset selectedCard
                // Check the state of the challenge
                checkStateOfChallenge();
            } else {
                // Highlight a red border around the pile for 1 second then have it fade out
                event.target.style.border = '5px solid red';
                setTimeout(function() {
                    event.target.style.border = '';
                }, 1000);
            }
        }
    });

    // Handler for the Draw Cards button
    document.getElementById('deck').addEventListener('click', function(event) {
        let data = game.deck.dealCards();
        if (data.success) {
            // Update the hand display based on the response
            let hand = document.getElementById('hand');
            hand.innerHTML = ''; // Clear current hand display
            data.hand.forEach(function(card) {
                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.setAttribute('data-card', card);
                cardDiv.textContent = card;
                hand.appendChild(cardDiv);
            });
            // remove the highlight from the draw cards button
            document.getElementById('deck').style.backgroundColor = '';
            // Update the remaining Cards value of the deck
            document.getElementById('deck').textContent = "Deck " + data.remainig_cards;
            // check the state of the challenge
            checkStateOfChallenge();
        } else {
            event.target.style.border = '5px solid red';
                setTimeout(function() {
                    event.target.style.border = '';
                }, 1000);
        }
    })
});