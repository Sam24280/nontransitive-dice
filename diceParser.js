import Dice from './dice.js';

class DiceParser {
  static parse(args) {
    if (args.length < 3) {
      throw new Error(`Invalid number of dice. Provide at least 3. Example: node game.js 1,2,3,4,5,6 1,1,6,6,8,8 3,3,5,5,7,7`);
    }

    const dice = args.map((arg, idx) => {
      const faces = arg.split(',').map(Number);
      if (faces.some(isNaN)) {
        throw new Error(`Invalid face in dice ${idx + 1}: All faces must be integers.`);
      }
      if (faces.length < 2) {
        throw new Error(`Invalid dice ${idx + 1}: Must have at least 2 faces.`);
      }
      return new Dice(faces);
    });

    return dice;
  }
}

export default DiceParser;


