let game = new Challenge();

function checkStateOfChallenge() {
    state = game.deck.checkStateOfChallenge();
    if (state == 'won') {
        alert("You won the game!");
        window.location.href = '/';
    } else if (state == 'lost') {
        alert("You lost the game!");
        window.location.href = '/';
    } else if (state == 'draw') {
        document.getElementById('deck').style.border = '5px solid #ffd700';
    }
}

document.getElementById('start-button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('start-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    document.getElementById('container').style.minHeight = '100vh';
    document.getElementById('quit').style.display = 'block';
    game.newGame();
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

                // Add the shake class to apply the animation
                event.target.classList.add('shake');

                // Set a timeout to remove the shake class and border after 1 second (or match to animation duration)
                setTimeout(function() {
                    event.target.style.border = '';
                    event.target.classList.remove('shake'); // Remove the shake effect after it completes
                }, 1000); // This duration should match or exceed your CSS animation duration
            }
        }
    });

    // Handler for the Draw Cards button
    document.getElementById('deck').addEventListener('click', function(event) {
        let success = game.deck.dealCards();
        let cards = game.deck.hand.cards
        if (success) {
            // Update the hand display based on the response
            let hand = document.getElementById('hand');
            hand.innerHTML = ''; // Clear current hand display
            cards.forEach(function(card) {
                let cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.setAttribute('data-card', card);
                cardDiv.textContent = card;
                hand.appendChild(cardDiv);
            });
            // remove the highlight from the draw cards button
            document.getElementById('deck').style.border = '5px solid #ccc';
            // Update the remaining Cards value of the deck
            document.getElementById('deck').textContent = "Deck " + game.deck.cards.length;
            // check the state of the challenge
            checkStateOfChallenge();
        } else {
            event.target.style.border = '5px solid red';
                setTimeout(function() {
                    event.target.style.border = '';
                }, 500);
        }
    })

    //Handler for Quit button
    document.getElementById('quit').addEventListener('click', function(event) {
        window.location.href = '/';
        // Hide the game section and show the start section
        document.getElementById('game-section').style.display = 'none';
        // Hide the menu button
        document.getElementById('quit').style.display = 'none';
    });
});