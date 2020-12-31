'use strict';

const btns = document.querySelector('.btn');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');


score0El.textContent = 0;
score1El.textContent = 0; 
let currScore = 0; 
dice.classList.add('hidden');
// Player 1 = 0, Player 2 = 1
let currPlayer = 0; 
let scores = [0, 99];
let playing = true;



const newDiceNum = function (){
    return Math.trunc(Math.random()* 6) + 1; 
}

const switchPlayers = function(){
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    currPlayer = currPlayer === 0 ? 1: 0;
}


const resetCurrScore = function(){
    currScore = 0; 
    document.getElementById(`current--${currPlayer}`).textContent = currScore;

}
// Roll Dice Function
btnRoll.addEventListener('click', function(){
    if (playing){
        dice.classList.remove('hidden');
        let diceNum = newDiceNum();
    
        console.log(diceNum);
        dice.src = `dice-${diceNum}.png`;
    
        if (diceNum !== 1) {
            currScore+= diceNum;
            document.getElementById(`current--${currPlayer}`).textContent = currScore;
            // current0El.textContent = currScore;
        } else {
            // Set curr score to zero and switch players
            //To 0
            resetCurrScore();
    
            // Switch Players
            switchPlayers();
           
        }
    }
    
})

btnHold.addEventListener('click', function(){
    //on click, switch player, and keep the same score
    if(playing){
        scores[currPlayer] += currScore;

        //Add to total score
        currPlayer === 0 ? score0El.textContent = scores[currPlayer] : score1El.textContent = scores[currPlayer];
    
        //Reset Current Score to 0
        if (scores[currPlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${currPlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${currPlayer}`).classList.add('player--winner');
            dice.classList.add('hidden');
        }else{
            //Swap Players
            resetCurrScore();
            switchPlayers();
        }
    }

btnNew.addEventListener('click', function(){
    for(let i = 0; i<scores.length; i++){
        scores[i] = 0;
        document.getElementById(`score--${i}`).textContent = 0;
    }
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    if(!playing && document.querySelector(`.player--${currPlayer}`).classList.contains('player--winner')){
        document.querySelector(`.player--${currPlayer}`).classList.remove('player--winner');
        playing = true;
    }
    
    if (!player0.classList.contains('player--active')){
        player0.classList.add('player--active');
        player1.classList.remove('player--active');
        currPlayer = 0;
    }

    
})
})

