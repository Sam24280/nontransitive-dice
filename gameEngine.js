import promptSync from 'prompt-sync';
import FairRandomProtocol from './FairRandomProtocol.js';
import ProbabilityTableRenderer from './ProbabilityTableRenderer.js';

const prompt = promptSync(); 

class GameEngine {
  constructor(diceList) {
    this.diceList = diceList;
  }

  async start() {
    console.log(`Welcome to Non-Transitive Dice Game!`);

    console.log(`Fair toss to decide who picks dice first.`);
    const toss = new FairRandomProtocol(0, 1);

    console.log(`Computer HMAC: ${toss.getHMAC()}`);
    const userBit = Number(prompt(`Enter your 0 or 1: `));

    const tossResult = toss.computeFinalValue(userBit);
    console.log(`Computer bit: ${toss.getComputerValue()}`);

    console.log(`Key: ${toss.getKey()}`);
    console.log(`Who picks first: ${tossResult === 0 ? 'Computer' : 'You'}`);

    let computerChoice, userChoice;

    if (tossResult === 0) {
      computerChoice = this.selectComputerDice();
      userChoice = this.promptUserDice(computerChoice);
    } else {
      userChoice = this.promptUserDice();
      computerChoice = this.selectComputerDice(userChoice);
    }

    console.log(`Computer picked Dice ${computerChoice + 1}`);
    console.log(`You picked Dice ${userChoice + 1}`);

    const userRoll = new FairRandomProtocol(0, this.diceList[0].getFaceCount() - 1);
    console.log(`Your roll HMAC: ${userRoll.getHMAC()}`);
    const userInput = Number(prompt(`Enter your number 0-${this.diceList[0].getFaceCount() - 1}: `));
    const userFaceIndex = userRoll.computeFinalValue(userInput);
    console.log(`Computer roll index for you: ${userRoll.getComputerValue()}`);
    console.log(`Key: ${userRoll.getKey()}`);
    
    if (!this.diceList[userChoice] || !this.diceList[computerChoice]) {
      console.error("Invalid dice selection. Game aborted.");
      return;
    }

    const compRoll = new FairRandomProtocol(0, this.diceList[0].getFaceCount() - 1);
    console.log(`Computer roll HMAC: ${compRoll.getHMAC()}`);
    const userInput2 = Number(prompt(`Enter your number 0-${this.diceList[0].getFaceCount() - 1} for computer roll: `));
    const compFaceIndex = compRoll.computeFinalValue(userInput2);
    console.log(`Computer roll index: ${compRoll.getComputerValue()}`);
    console.log(`Key: ${compRoll.getKey()}`);

    const userValue = this.diceList[userChoice].getFace(userFaceIndex);
    const compValue = this.diceList[computerChoice].getFace(compFaceIndex);

    console.log(`Your roll: ${userValue}`);
    console.log(`Computer roll: ${compValue}`);

    if (userValue > compValue) console.log(`You win!`);
    else if (compValue > userValue) console.log(`Computer wins!`);
    else console.log(`It's a tie!`);

    console.log(`Type 'help' for probability table or 'exit' to quit.`);
    const cmd = prompt(`> `);
    if (cmd === 'help') render(this.diceList);
  }

  selectComputerDice(userChoice = null) {
    const available = this.diceList
      .map((_, idx) => idx)
      .filter(i => i !== userChoice);
    return available[Math.floor(Math.random() * available.length)];
  }

  promptUserDice(exclude = null) {
  console.log(`Available dice:`);
  this.diceList.forEach((d, idx) => {
    if (idx !== exclude) {
      console.log(`${idx + 1}: ${d.faces}`);
    }
  });

  let validChoices = this.diceList
    .map((_, idx) => idx)
    .filter(i => i !== exclude);

  let choice = Number(prompt(`Pick dice number: `)) - 1;
  while (!validChoices.includes(choice)) {
    choice = Number(prompt(`Invalid. Pick again: `)) - 1;
  }

  return choice;
}


}

export default GameEngine;
