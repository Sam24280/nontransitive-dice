import DiceParser from './diceParser.js';
import GameEngine from './gameEngine.js';

try {
  const diceList = DiceParser.parse(process.argv.slice(2));
  const game = new GameEngine(diceList);
  game.start();
} catch (err) {
  console.error(`ERROR: ${err.message}`);
}