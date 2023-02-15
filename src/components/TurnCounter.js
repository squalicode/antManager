import TurnMarker from "./TurnMarker";

function TurnCounter({ turn, turnTotal, hatchFrequency, seasonFrequency }) {
  return (
    <>
      <p>Current turn: <span className="data">{turn}</span></p>
      <p>Turns left: <span className="data">{turnTotal - turn+1}</span></p>
      <div className="turn-viewer">
        <div>
          🌸
          { Array.apply(null, Array(turnTotal/4)).map(function (t, index) {
            return <TurnMarker
              key={index}
              index={index+1}
              done={index+1 < turn}
              current={index+1 === turn}
              hatchTurn={!((index+1) % hatchFrequency) && index+1 !== turnTotal}
              seasonTurn={!((index+1) % seasonFrequency)} />;
          })}
        </div>
        <div>
          🌾
          { Array.apply(null, Array(turnTotal/4)).map(function (t, index) {
            const index2ndRow = index + turnTotal/4;
            return <TurnMarker
              key={index2ndRow}
              index={index2ndRow+1}
              done={index2ndRow+1 < turn}
              current={index2ndRow+1 === turn}
              hatchTurn={!((index2ndRow+1) % hatchFrequency) && index2ndRow+1 !== turnTotal}
              seasonTurn={!((index2ndRow+1) % seasonFrequency)} />;
          })}
        </div>
        <div>
          🍂
          { Array.apply(null, Array(turnTotal/4)).map(function (t, index) {
            const index2ndRow = index + turnTotal/4*2;
            return <TurnMarker
              key={index2ndRow}
              index={index2ndRow+1}
              done={index2ndRow+1 < turn}
              current={index2ndRow+1 === turn}
              hatchTurn={!((index2ndRow+1) % hatchFrequency) && index2ndRow+1 !== turnTotal}
              seasonTurn={!((index2ndRow+1) % seasonFrequency)} />;
          })}
        </div>
        <div>
          ❄&#xfe0f;
          { Array.apply(null, Array(turnTotal/4)).map(function (t, index) {
            const index2ndRow = index + turnTotal/4*3;
            return <TurnMarker
              key={index2ndRow}
              index={index2ndRow+1}
              done={index2ndRow+1 < turn}
              current={index2ndRow+1 === turn}
              hatchTurn={!((index2ndRow+1) % hatchFrequency) && index2ndRow+1 !== turnTotal}
              seasonTurn={!((index2ndRow+1) % seasonFrequency)} />;
          })}
        </div>
      </div>
    </>
  );
}

export default TurnCounter;