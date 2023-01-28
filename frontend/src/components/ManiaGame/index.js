import { GameController, SkinProvider } from "bemaniajs";
import { useEffect, useRef, useState } from "react";

import "./index.scss";

export function ManiaGame({
  songInfo,
  debugMode,
  scrollSpeed = 10,
  slanted,
  volume = 0.2,
  paused,
  height = 60,
  gameScale = 1,
  initialOptions,
  ...rest
}) {
  const gameBgRef = useRef(null);
  const gameRef = useRef(null);
  const gameFgRef = useRef(null);

  const [game, setGame] = useState(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let g;
    const skin = new SkinProvider({ gameScale });
    setWidth(skin?.noteWidth * songInfo?.keys);
    if (gameFgRef.current && gameRef.current) {
      g = new GameController({
        fgCanvas: gameFgRef.current,
        bgCanvas: gameBgRef.current,
        gameCanvas: gameRef.current,
        songInfo: songInfo,
        skin: skin,
        initialOptions: initialOptions,
        gameScale: gameScale,
      });
      setGame(g);
    }

    // call unmount callback
    return () => {
      g?.unmountGame();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameFgRef, gameRef, songInfo]);

  useEffect(() => {
    game?.adjustOption("scrollSpeed", scrollSpeed);
  }, [game, scrollSpeed]);

  useEffect(() => {
    game?.set("debug", debugMode);
  }, [game, debugMode]);

  useEffect(() => {
    game?.gameSetPaused(paused);
  }, [game, paused]);

  useEffect(() => {
    game?.audioController?.setAudioAttribute("volume", volume);
  }, [game, volume]);

  return (
    <>
      <div
        className="container"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <div id="stage" className={`${slanted && "slanted"}`}>
          <canvas
            id="playfieldBg"
            width={width}
            height={height}
            ref={gameBgRef}
          />
          <canvas
            id="playfieldOverlay"
            width={width}
            height={height}
            ref={gameFgRef}
          />
          <canvas id="playfield" width={width} height={height} ref={gameRef} />
        </div>
      </div>
    </>
  );
}
