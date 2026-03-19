/*
aesthetics arc:
- host on 3dtictactoe.caesarbrahh.dev
- mobile compatability
*/
import { startClassic } from './classic/classic.js';
import { startTower } from './tower/tower.js';

const menu = document.getElementById('menu');
const gameUI = document.getElementById('game-ui');
const gameTitle = document.getElementById('game-title');

const classicBtn = document.getElementById('classic-btn');
const towerBtn = document.getElementById('tower-btn');
const playAgainBtn = document.getElementById('butt');
const menuBtn = document.getElementById('menu-btn');

function startMode(mode) {
  localStorage.setItem('mode', mode);

  menu.classList.add('hidden');
  gameUI.classList.remove('hidden');

  if (mode === 'classic') {
    gameTitle.textContent = '3D Tic-Tac-Toe';
    startClassic();
  } else {
    gameTitle.textContent = 'Tower Tic-Tac-Toe';
    startTower();
  }
}

classicBtn.addEventListener('click', () => startMode('classic'));
towerBtn.addEventListener('click', () => startMode('tower'));

playAgainBtn.addEventListener('click', () => { location.reload(); });

menuBtn.addEventListener('click', () => {
  localStorage.removeItem('mode');
  location.reload();
});

const savedMode = localStorage.getItem('mode');
if (savedMode === 'classic' || savedMode === 'tower') {
  startMode(savedMode);
}