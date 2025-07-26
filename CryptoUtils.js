import { randomBytes, randomInt } from 'crypto';
import CryptoJS from 'crypto-js';

class CryptoUtils {
  static generateSecureKey() {
    return randomBytes(32).toString('hex'); // 256 bits
  }

  static generateSecureInt(min, max) {
    // crypto.randomInt is uniform
    return randomInt(min, max + 1);
  }

  static calculateHMAC(key, message) {
    return CryptoJS.HmacSHA3(message.toString(), key).toString();
  }
}

export default CryptoUtils;
