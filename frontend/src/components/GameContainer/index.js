import { ManiaGame } from "../ManiaGame";
import { convertNotesFromOsz } from "bemaniajs";
import "./index.scss";
import at__at from "../../songs/Chroma/notes.json";

const songInfo = {
  name: "@__@",
  artist: "Chroma",
  notes: convertNotesFromOsz(at__at.notes),
  url: "./songs/Chroma/audio.mp3",
  keys: 7,
};

export function GameContainer() {
  return (
    <div className="gameContainer">
      <ManiaGame
        songInfo={songInfo}
        debugMode={false}
        scrollSpeed={10}
        slanted={true}
        volume={0}
        paused={false}
        height={640}
        gameScale={1}
      />
    </div>
  );
}
