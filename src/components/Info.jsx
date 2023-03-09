import Help from "./Help";
import Stats from "./Stats";
import Time from "./Time";

function Info({ svgs, people, peopleBonus, ants, eggs, food, fertility, fertilityBonus, intelligence, intelligenceBonus, resistance, resistanceBonus, attack, attackBonus, luck, luckBonus, turn, turnTotal, hatchFrequency, seasonFrequency, season, temperature, idealTemperature, eggPointValue, foodPointValue }) {
    return (
      <div className="info">
        <Help svgs={svgs} turnTotal={turnTotal} eggPointValue={eggPointValue} hatchFrequency={hatchFrequency} foodPointValue={foodPointValue}/>
            <Stats
              svgs={svgs}
              people={people}
              peopleBonus={peopleBonus}
              ants={ants}
              eggs={eggs}
              food={food}
              fertility={fertility}
              fertilityBonus={fertilityBonus}
              intelligence={intelligence}
              intelligenceBonus={intelligenceBonus}
              resistance={resistance}
              resistanceBonus={resistanceBonus}
              attack={attack}
              attackBonus={attackBonus}
              luck={luck}
              luckBonus={luckBonus}
            />
            <Time
              svgs={svgs}
              turn={turn}
              turnTotal={turnTotal}
              hatchFrequency={hatchFrequency}
              seasonFrequency={seasonFrequency}
              season={season}
              temperature={temperature}
              idealTemperature={idealTemperature}
            />
      </div>
    );
}
  
export default Info;