class dice {
  constructor(faces) {
    this.faces = faces;
  }

  getFace(index) {
    return this.faces[index];
  }

  getFaceCount() {
    return this.faces.length;
  }
}

export default dice;
