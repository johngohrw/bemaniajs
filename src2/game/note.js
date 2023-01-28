// number of seconds to lookahead
// for a note to be considered in render range.
const SCROLL_CONSTANT = 20;

export class NoteFactory {
  constructor({ songInfo, canvas, options, audio, skin }) {
    console.log("[NoteFactory] initializing notes...", songInfo, canvas);
    this.options = options;
    this.audio = audio;
    this.skin = skin;
    this.songInfo = songInfo;
    this.notes = songInfo.notes;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.animationFrame;

    // renderQueue array
    this.renderQueue = Object.values(songInfo.notes);

    // start pointer to begin noteRendering from
    this.renderStartPtr = 0;
    this.ptrLastUpdate = performance.now();
    this.updateInterval = 500; // interval between every renderable note update call

    // initial lookahead, updates start/end pointers.
    this.updateStartPtr(0);
  }

  // draw notes on canvas (starting from renderStartPtr)
  draw(gameTime, debug = false) {
    for (let i = this.renderStartPtr; i < this.renderQueue.length; i++) {
      const timeStep = this.renderQueue[i];
      const arbitraryNote = timeStep[0];

      let dt = gameTime - arbitraryNote.t_hit;
      let dy = Math.floor((dt * this.options.scrollSpeed) / SCROLL_CONSTANT);

      const notesOutOfCanvas = dy < -(this.canvas.height + this.skin.judgePos);
      if (notesOutOfCanvas) {
        break;
      }

      const withinRenderRange = -this.canvas.height < dy && dy < 100;
      if (withinRenderRange) {
        const notePos = dy + this.canvas.height - this.skin.judgePos;

        timeStep.forEach((note) => {
          this.context.fillStyle =
            this.skin.laneColors[this.songInfo.keys][note.col];
          this.context.fillRect(
            (note.col - 1) * this.skin.noteWidth,
            notePos,
            this.skin.noteWidth,
            this.skin.noteHeight
          );

          // dy debug
          if (debug) {
            this.context.fillText(
              dy,
              (note.col - 1) * this.skin.noteWidth,
              notePos
            );
          }
        });
      }
    }

    const now = performance.now();
    // update renderable notes every interval.
    if (now - this.ptrLastUpdate > this.updateInterval) {
      this.ptrLastUpdate = now;
      this.updateStartPtr(gameTime);
    }
  }

  // Updates the startPointer based on gameTime.
  // Can be called infrequently to boost performance (instead of every frame).
  updateStartPtr(currTime) {
    const gracePeriod = 200; // let stale notes linger

    // check for stale notes, incrementing renderStartPtr
    while (
      this.renderStartPtr < this.renderQueue.length &&
      this.renderQueue[this.renderStartPtr][0].t_hit < currTime - gracePeriod
    ) {
      this.renderStartPtr++;
    }
  }

  // manual note state reset
  resetNotes() {
    this.renderQueuePointer = 0;
    this.notesToRender = [];
    this.notesToRenderPointer = 0;
  }
}
