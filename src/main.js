/*
aesthetics arc:
- ui menu
- readme
- host on 3dtictactoe.caesarbrahh.dev
- mobile compatability
*/
import { startClassic } from './modes/classic.js';
import { startTower } from './modes/tower.js';

const menu = document.getElementById('menu');
const gameUI = document.getElementById('game-ui');
const gameTitle = document.getElementById('game-title');

const classicBtn = document.getElementById('classic-btn');
const towerBtn = document.getElementById('tower-btn');

function startMode(mode) {
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