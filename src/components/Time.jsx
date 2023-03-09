import TurnCounter from "./TurnCounter";

function Time({ svgs, turn, turnTotal, hatchFrequency, seasonFrequency, season, temperature, idealTemperature }) {

    // Creates an array of thermometer SVG graphics
    // It repeats the same graphic once for every 5 degrees of difference from the ideal temperature
    let temperatureVisual = (Math.floor(temperature - idealTemperature)/5 !== 0) ?
        (Math.floor(temperature - idealTemperature)/5 > 0) ?
            Array.from(' '.repeat(Math.floor(temperature - idealTemperature)/5)).fill(svgs.hot) :
            Array.from(' '.repeat(Math.floor(idealTemperature - temperature)/5)).fill(svgs.cold) :
        '';
    // Alt text for screen readers
    let temperatureAlt = (Math.floor(temperature - idealTemperature)/5 !== 0) ?
        (Math.floor(temperature - idealTemperature)/5 > 0) ?
            'very '.repeat(Math.floor(temperature - idealTemperature)/5 -1).concat('hot') :
            'very '.repeat(Math.floor(idealTemperature - temperature)/5 -1).concat('cold') :
        '';
    
    return (
        <section aria-labelledby="time" className="time" aria-live="polite">
          <h2 id="time">Time</h2>
            <TurnCounter svgs={svgs} turn={turn} turnTotal={turnTotal} hatchFrequency={hatchFrequency} seasonFrequency={seasonFrequency} />
            <hr aria-hidden="true" />
            <p aria-atomic="true">Season: <span className="data">{season}</span></p>
            <p aria-atomic="true">
                Temperature: <span className="data">{temperature}</span>°<span aria-label="Celsius"><span aria-hidden="true">C</span></span><br/>
                {temperatureVisual.length? <span className="data" aria-label={temperatureAlt}>{temperatureVisual}</span> : <></>}
            </p>
        </section>
    );
}
  
export default Time;