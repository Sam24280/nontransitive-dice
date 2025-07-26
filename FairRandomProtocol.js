import CryptoUtils from './CryptoUtils.js';

class FairRandomProtocol {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.key = CryptoUtils.generateSecureKey();
    this.computerValue = CryptoUtils.generateSecureInt(min, max);
    this.hmac = CryptoUtils.calculateHMAC(this.key, this.computerValue);
  }

  getHMAC() {
    return this.hmac;
  }

  getComputerValue() {
    return this.computerValue;
  }

  getKey() {
    return this.key;
  }

  computeFinalValue(userValue) {
    const sum = (this.computerValue + userValue) % (this.max + 1);
    return sum;
  }
}

export default FairRandomProtocol;
