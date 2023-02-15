import TurnCounter from "./TurnCounter";

function Time({ turn, turnTotal, hatchFrequency, seasonFrequency, season, temperature, idealTemperature }) {
    let temperatureVisual = (Math.floor(temperature - idealTemperature)/5 !== 0) ?
        (Math.floor(temperature - idealTemperature)/5 > 0) ? 
            '🥵'.repeat(Math.floor(temperature - idealTemperature)/5) :
            '🥶'.repeat(Math.abs(Math.floor(temperature - idealTemperature)/5)) :
        '';


    
    return (
        <section className="time">
          <h2>Time</h2>
            <TurnCounter turn={turn} turnTotal={turnTotal} hatchFrequency={hatchFrequency} seasonFrequency={seasonFrequency} />
            <hr/>
            <p>Season: <span className="data">{season}</span></p>
            <p>
                Temperature: <span className="data">{temperature}</span>°C<br/>
                <span className="data">{temperatureVisual}</span>
            </p>
        </section>
    );
}
  
export default Time;