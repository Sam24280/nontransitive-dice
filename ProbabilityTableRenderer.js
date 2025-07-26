import Table from 'cli-table3';
import ProbabilityCalc from './ProbabilityCalc.js';

class ProbabilityTableRenderer {
  static render(diceList) {
    const table = new Table({
      head: [''].concat(diceList.map((_, i) => `Dice ${i + 1}`))
    });

    diceList.forEach((diceA, i) => {
      const row = [`Dice ${i + 1}`];
      diceList.forEach((diceB, j) => {
        if (i === j) row.push('N/A');
        else {
          const prob = ProbabilityCalc.calculateProbability (diceA, diceB);
          row.push(`Win: ${(prob.A * 100).toFixed(1)}%`);
        }
      });
      table.push(row);
    });

    console.log(table.toString());
  }
}

export default ProbabilityTableRenderer;
