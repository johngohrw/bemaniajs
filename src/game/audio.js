export class AudioController {
  constructor(url) {
    this.instance = url ? new Audio(url) : null;
  }

  getNode() {
    return this.instance;
  }

  setAudioAttribute(key, value) {
    this.instance[key] = value;
  }

  destroy() {
    this.instance.setAttribute("src", null);
    this.instance.load();
    this.instance.play();
  }
}
