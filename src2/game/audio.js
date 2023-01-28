export class AudioProvider {
  constructor({ url, onCanPlayFunction }) {
    this.instance = url ? new Audio(url) : null;

    if (onCanPlayFunction) {
      this.instance.addEventListener("canplay", onCanPlayFunction);
    }
  }

  getNode() {
    return this.instance;
  }

  setAudioAttribute(key, value) {
    this.instance[key] = value;
  }
}
