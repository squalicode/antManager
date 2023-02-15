import { useState, useRef } from "react";

import Info from "./components/Info";
import Deck from "./components/Deck";
import Hand from "./components/Hand";
import Footer from "./components/Footer";

import Results from "./components/Results";

function App() {
  const [turn, setTurn] = useState(1);

  const eggPointValue = 5;
  const foodPointValue = 100;

  // Stats
  const stats = useRef({
    ants: 0,
    eggs: 0,
    food: 10,
    fertility: 1,
    intelligence: 4,
    resistance: 1,
    attack: 1,
    luck: 1,

    fertilityBonus: 0,
    intelligenceBonus: 0,
    resistanceBonus: 0,
    attackBonus: 0,
    luckBonus: 0
  });

  // Import cards and insert and id for each one
  const cards = useRef(require('./cards.json').map((card, index) => {card.id = index; return card;}));
  // Pick the first 4 cards for the deck on the first turn
  const cardsOnDeck = useRef(cards.current.slice(0, stats.current.intelligence));
  const cardsOnHand = useRef([]);

  const baseTemperatures = {
    spring: 25,
    summer: 33,
    autumn: 16,
    winter: 5
  }
  const idealTemperature = 25;
  const temperatureVariation = 3;
  const turnTotal = 60; // MUST be a multiple of 4
  const SEASONS = 4;
  const seasonFrequency = Math.floor(turnTotal/SEASONS);
  const hatchFrequency = 5;

  const temperature = useRef(baseTemperatures.spring);
  const season = useRef('spring');

  const raid = useRef({
    turn: 0,
    attack: 0,
    soldiers: 0
  });

  // Functions are defined as properties in this object because
  // their names are referenced as a string in cards.json.
  // since each card can call a different function when bought.
  // It's practical to call them with that string like so:
  // actionList['functionName']();
  const actionList = {
    change: (stat, amount) => {
      stats.current[stat] += amount;
    },

    searchFood: () => {
      if (stats.current.ants) {
        let foundFood = stats.current.ants*(stats.current.luck/10 - Math.abs(idealTemperature-temperature.current)/(stats.current.resistance + 20));
        if (foundFood < 0) {foundFood = 0};
        // Round to 1 decimal point
        actionList['change']('food', foundFood);
      }
    },

    hatchEggs: () => {
      if (stats.current.eggs) {
        actionList['change']('ants', stats.current.eggs);
        stats.current.eggs = 0;
      }
    },

    shuffleDeck: () => {
      // Shuffle cards randomly
      cards.current = cards.current.reduceRight((r,_,__,s) => {
      return (r.push(s.splice(0|Math.random()*s.length,1)[0]), r)}, []);
      cardsOnDeck.current = cards.current.slice(0, Math.floor(stats.current.intelligence));
    },

    cancelRaid: () => {
      raid.current = {
        turn: 0,
        attack: 0,
        soldiers: 0
      };
    },

    generateRaid: () => {
      let minAttackStrength = 0;
      let maxAttackStrength = 0;

      // Decide at which turn the raid will arrive (inside of the season's turns)
      switch (season.current) {
        case 'summer':
          raid.current.turn = Math.round(Math.random() * (seasonFrequency*2 - seasonFrequency) + seasonFrequency);
          maxAttackStrength = 5 - stats.current.luck/2;
          minAttackStrength = 1;
          break;
        case 'autumn':
          raid.current.turn = Math.round(Math.random() * (seasonFrequency*3 - seasonFrequency*2) + seasonFrequency*2);
          maxAttackStrength = 10 - stats.current.luck/2;
          minAttackStrength = 5;
          break;
        default:
          // Don't generate a raid in the last turn
          raid.current.turn = Math.round(Math.random() * ((seasonFrequency*4-1) - seasonFrequency*3) + seasonFrequency*3);
          maxAttackStrength = 20 - stats.current.luck/2;
          minAttackStrength = 10;
          break;
      }

      // Generate attack (raids get stronger each season that passes, and luck influences the attack generated)
      raid.current.attack = Math.round(Math.random() * (maxAttackStrength - minAttackStrength) + minAttackStrength);

      // Generate ant amount
      raid.current.soldiers = Math.round(Math.random() * ((stats.current.ants + 100) - 50) + 50);
    },

    runRaid: () => {
      if (stats.current.attack < raid.current.attack) {
        stats.current.ants -= raid.current.soldiers - Math.round(stats.current.resistance);
        if (stats.current.ants < 0) stats.current.ants = 0;
        stats.current.food -= raid.current.soldiers - Math.round(stats.current.resistance);
        if (stats.current.food < 0) stats.current.food = 0;
      } else {
        stats.current.ants += raid.current.soldiers;
      }
    },

    endTurn: () => {
      // Ants search for food
      actionList['searchFood']();

      // Queen lays eggs
      actionList['change']('eggs', Math.floor(stats.current.fertility));

      // Hatch eggs every 5 turns, except for the last turn
      if (!(turn % hatchFrequency) && turn !== turnTotal) {
        actionList['hatchEggs']();
      }

      // Change season & generate one raid and raidTurn each season.
      // A raid card appears on the deck when turn === raidTurn.
      if (!(turn % seasonFrequency) && turn !== turnTotal) {
        switch (turn) {
          case seasonFrequency:
            season.current = 'summer';
            actionList['generateRaid']();
            break;
          case seasonFrequency*2:
            season.current = 'autumn';
            actionList['generateRaid']();
            break;
          default:
            season.current = 'winter';
            actionList['generateRaid']();
            break;
        }
      }

      // Change temperature
      const turnVariation = Math.round(Math.random() * (temperatureVariation - temperatureVariation*-1) + temperatureVariation*-1);
      temperature.current = baseTemperatures[season.current] + turnVariation;

      // Turn-based bonuses
      if (stats.current.fertilityBonus) {actionList['change']('fertility', stats.current.fertilityBonus);}
      if (stats.current.intelligenceBonus) {actionList['change']('intelligence', stats.current.intelligenceBonus);}
      if (stats.current.resistanceBonus) {actionList['change']('resistance', stats.current.resistanceBonus);}
      if (stats.current.attackBonus) {actionList['change']('attack', stats.current.attackBonus);}
      if (stats.current.luckBonus) {actionList['change']('luck', stats.current.luckBonus);}

      // Shuffle cards
      actionList['shuffleDeck']();

      setTurn(oldTurn => oldTurn + 1);
    },

    buyFromDeck: (cardId) => {
      // Bought card gets added at the beginning of the array
      cardsOnHand.current = [cardsOnDeck.current.find(c => c.id === cardId)].concat(cardsOnHand.current);
    }
  }

  return (
    <>
      <h1>Ant manager</h1>
      { (turn > turnTotal) ?
      <Results 
        ants={stats.current.ants}
        eggs={stats.current.eggs}
        food={stats.current.food}
        eggPointValue={eggPointValue}
        foodPointValue={foodPointValue}/> :
      <>
        <Info 
          ants={stats.current.ants}
          eggs={stats.current.eggs}
          food={stats.current.food}
          fertility={stats.current.fertility}
          fertilityBonus={stats.current.fertilityBonus}
          intelligence={stats.current.intelligence}
          intelligenceBonus={stats.current.intelligenceBonus}
          resistance={stats.current.resistance}
          resistanceBonus={stats.current.resistanceBonus}
          attack={stats.current.attack}
          attackBonus={stats.current.attackBonus}
          luck={stats.current.luck}
          luckBonus={stats.current.luckBonus}
          turn={turn}
          turnTotal={turnTotal}
          hatchFrequency={hatchFrequency}
          seasonFrequency={seasonFrequency}
          season={season.current}
          temperature={temperature.current}
          idealTemperature={idealTemperature}
          eggPointValue={eggPointValue}
          foodPointValue={foodPointValue}/>
        <Deck
          cards={cardsOnDeck.current}
          actionList={actionList}
          food={stats.current.food}
          eggs={stats.current.eggs}
          ants={stats.current.ants}
          fertility={stats.current.fertility}
          intelligence={stats.current.intelligence}
          resistance={stats.current.resistance}
          attack={stats.current.attack}
          luck={stats.current.luck}
          turn={turn}
          raid={raid.current}
          />
        <Hand cards={cardsOnHand.current} />
      </> }
      <Footer />
    </>
  );
}

export default App;