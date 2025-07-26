class ProbabilityCalc {
  static calculateProbability(diceA, diceB) {
    let winA = 0;
    let winB = 0;
    let ties = 0;

    for (const faceA of diceA.faces) {
      for (const faceB of diceB.faces) {
        if (faceA > faceB) winA++;
        else if (faceB > faceA) winB++;
        else ties++;
      }
    }

    const total = diceA.faces.length * diceB.faces.length;
    return {
      A: winA / total,
      B: winB / total,
      tie: ties / total,
    };
  }
}

export default ProbabilityCalc;
