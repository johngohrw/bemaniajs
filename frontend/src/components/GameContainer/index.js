import { ManiaGame } from "../ManiaGame";
import { convertNotesFromOsz } from "bemaniajs";
import "./index.scss";
import at__at from "../../songs/Chroma/notes.json";
import { useState } from "react";

const songInfo = {
  name: "@__@",
  artist: "Chroma",
  notes: convertNotesFromOsz(at__at.notes),
  url: "./songs/Chroma/audio.mp3",
  keys: 7,
};

export function GameContainer() {
  const [volume, setVolume] = useState(0.1);
  const [paused, setPaused] = useState(false);
  const [debug, setDebug] = useState(false);

  return (
    <div className="gameContainer">
      <ManiaGame
        songInfo={songInfo}
        debugMode={debug}
        scrollSpeed={10}
        slanted={true}
        volume={volume}
        paused={paused}
        height={640}
        gameScale={1}
      />
      <div className="controls">
        <div>
          volume:
          <button onClick={() => setVolume(Math.max(0, volume - 0.1))}>
            -
          </button>
          <button onClick={() => setVolume(Math.min(1, volume + 0.1))}>
            +
          </button>
          {volume}
        </div>
        paused:{" "}
        <button onClick={() => setPaused(!paused)}>{paused ? "y" : "n"}</button>
        debug:
        <button onClick={() => setDebug(!debug)}>{debug ? "y" : "n"}</button>
      </div>
    </div>
  );
}
