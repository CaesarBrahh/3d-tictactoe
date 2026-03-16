/*
aesthetics arc:
- mobile compatability

tower arc:
- buttons n shit

ai arc?:
*/
import { startClassic } from './modes/classic.js';
import { startTower } from './modes/tower.js';

let mode = "tower";

if (mode === "classic") {
  startClassic();
} else {
  startTower();
}