import uuid from "react-uuid";

import TurnCounter from "./TurnCounter";

function Time({ svgs, turn, turnTotal, hatchFrequency, seasonFrequency, season, temperature, idealTemperature }) {
    let temperatureVisual = (Math.floor(temperature - idealTemperature)/5 !== 0) ?
        (Math.floor(temperature - idealTemperature)/5 > 0) ?
            Array.from(' '.repeat(Math.floor(temperature - idealTemperature)/5)).fill(svgs.hot) :
            Array.from(' '.repeat(Math.floor(idealTemperature - temperature)/5)).fill(svgs.cold) :
        '';


    
    return (
        <section className="time">
          <h2>Time</h2>
            <TurnCounter svgs={svgs} turn={turn} turnTotal={turnTotal} hatchFrequency={hatchFrequency} seasonFrequency={seasonFrequency} />
            <hr/>
            <p>Season: <span className="data">{season}</span></p>
            <p>
                Temperature: <span className="data">{temperature}</span>°C<br/>
                {temperatureVisual.length? <span className="data" key={uuid()}>{temperatureVisual}</span> : <></>}
            </p>
        </section>
    );
}
  
export default Time;