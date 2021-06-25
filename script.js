'use strict';

const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.querySelector('#current--0')
const current1EL = document.querySelector('#current--1')
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Bắt đầu
let scores = [0, 0];
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Chức năng đổi người chơi
function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}

// Chức năng lăn con xúc xắc 
btnRoll.addEventListener('click',function(){
    if (playing) {
        // 1. thực hiện lăn con xúc xắc
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Hiển thị con xúc xắc
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden')

    // 3. So sánh với 1
    // TH khác 1
    if (dice != 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
        // TH bằng 1
        switchPlayer();
    }
    }    
})

// Chức năng giữ điểm 
btnHold.addEventListener('click',function(){

    if (playing) {
        // 1. Cộng điểm hiện tại vào người chơi đang chơi
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    // 2. Kiểm tra người chơi hiện tại dã đạt > 100 điểm chưa
    if (scores[activePlayer] >= 20) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        diceEl.classList.add('hidden')
        playing = false;
    }
    switchPlayer();
    }
})

// Chức năng reset game về ban đầu
btnNew.addEventListener('click',function(){
    playing = true;
    scores = [0, 0];
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    diceEl.classList.add('hidden');
    activePlayer = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner')
    document.querySelector(`.player--1`).classList.remove('player--winner')
    currentScore = 0;
    document.getElementById(`current--1`).textContent = currentScore
    document.getElementById(`current--0`).textContent = currentScore
    player0.classList.add('player--active')
    player1.classList.remove('player--active')

});