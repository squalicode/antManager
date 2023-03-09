function Help({ svgs, turnTotal, hatchFrequency, eggPointValue, foodPointValue }) {
    return (
        <section aria-labelledby="help" className="help">
          <h2 id="help">Help</h2>
          <details>
            <summary>The game</summary>
                <details>
                    <summary>Ant manager</summary>
                    <p><i>Ant manager</i> is a turn-based strategy game.</p>
                    <p>Your objective is to end up with as many {svgs.ants} ants, {svgs.eggs} eggs and {svgs.food} food as possible by the end of the game.</p>
                    <p>1 {svgs.ants} ant is worth 1 {svgs.points} point.</p>
                    <p>{eggPointValue} {svgs.eggs} eggs are worth 1 {svgs.points} point.</p>
                    <p>{foodPointValue} {svgs.food} food is worth 1 {svgs.points} point.</p>
                    <p>To start a new game, simply refresh the page.</p>
                </details>
                <details>
                    <summary>About cards</summary>
                    <p>Cards on the deck are shuffled every turn, and move to your hand when you take them. Every turn you can take 1 card or pass the turn without taking any.</p>
                    <p>Cards have different effects that are applied when you take them. They can have a cost that you need to pay with items or stats.</p>
                    <p>The amount of cards available to choose from on the deck is determined by {svgs.intelligence} intelligence.</p>
                </details>
                <details>
                    <summary>About turns</summary>
                    <p>The game ends after {turnTotal} turns have passed. Turns are divided into 4 rounds ({svgs.autumn} seasons) of {turnTotal/4} turns each.</p>
                    <p>Your turn progress can be viewed in the "time" panel. Turns that are multiples of {hatchFrequency}, drawn with a round shape, signify hatching turns ({svgs.eggs} eggs hatch into {svgs.ants} ants when the turn ends). Turns drawn with a bigger size mark the end of a {svgs.autumn} season. The last turn, despite being a multiple of {hatchFrequency}, is not a hatching turn.</p>
                </details>
          </details>
          <details>
            <summary>Items and stats</summary>
            <details>
                <summary>About {svgs.ants} ants</summary>
                <p>Each {svgs.ants} ant is worth 1 {svgs.points} point.</p>
                <p>At the end of each turn, your colony searches for {svgs.food} food. The amount of {svgs.food} food that it finds is influenced by the amount of {svgs.ants} ants, {svgs.luck} luck, temperature and {svgs.resistance} resistance.</p>
            </details>
            <details>
                <summary>About {svgs.eggs} eggs</summary>
                <p>{eggPointValue} {svgs.eggs} eggs are worth 1 {svgs.points} point.</p>
                <p>They are laid by the queen every turn. The amount depends on the queen's {svgs.fertility} fertility. {svgs.eggs} Eggs hatch into {svgs.ants} ants at the end of every turn marked with a round shape (every 5 turns).</p>
            </details>
            <details>
                <summary>About {svgs.food} food</summary>
                <p>{foodPointValue} {svgs.food} food are worth 1 {svgs.points} point.</p>
                <p>The amount of {svgs.food} food your colony finds every turn is influenced by the amount of {svgs.ants} ants, {svgs.luck} luck, temperature and {svgs.resistance} resistance.</p>
            </details>
            <details>
                <summary>About {svgs.fertility} fertility</summary>
                <p>Your queen's {svgs.fertility} fertility will determine the amount of {svgs.eggs} eggs she lays every turn.</p>
            </details>
            <details>
                <summary>About {svgs.intelligence} intelligence</summary>
                <p>Your queen's {svgs.intelligence} intelligence will determine the amount of cards available to choose in the deck. If your {svgs.intelligence} intelligence gets to 0, you will only be able to pass the turn.</p>
            </details>
            <details>
                <summary>About {svgs.resistance} resistance</summary>
                <p>Your {svgs.ants} ants' {svgs.resistance} resistance influences how much {svgs.food} food they can find every turn, as it protects them a little against extreme temperatures. It also protects them from {svgs.raid} raid attacks, if they're triggered.</p>
            </details>
            <details>
                <summary>About {svgs.attack} attack</summary>
                <p>Your {svgs.ants} ants' {svgs.attack} attack, if higher or equal than a {svgs.raid} raid's, will prevent an enemy attack.</p>
            </details>
            <details>
                <summary>About {svgs.luck} luck</summary>
                <p>Your {svgs.ants} ants' {svgs.luck} luck influences how much {svgs.food} food they can find every turn and the power of the {svgs.raid} raids that generate.</p>
            </details>
          </details>
          <details>
            <summary>Events</summary>
            <details>
                <summary>About {svgs.autumn} seasons</summary>
                <p>{svgs.autumn} Seasons change every round ({turnTotal/4} turns) and determine the overall temperature, which can vary slightly each turn.</p>
            </details>
            {/*<details>
                <summary>About 🌦&#xfe0f; weather</summary>
                <p>Temperature varies every turn and it's influenced by the current {svgs.autumn} season.</p>
            {/* </details> */}
            <details>
                <summary>About {svgs.raid} raids</summary>
                <p>A raid card generates in a random turn each {svgs.autumn} season except in {svgs.spring} spring. It appears in the deck as the only action you can take, with a random {svgs.attack} attack and soldier amount. {svgs.raid} Raids get a little stronger every {svgs.autumn} season and as you gain more {svgs.ants} ants.</p>
                <p>If your {svgs.ants} ants' {svgs.attack} attack is higher or equal to the card's, you will recruit the enemy soldiers as your own {svgs.ants} ants.</p>
                <p>Otherwise, you will lose an amount of {svgs.ants} ants and {svgs.food} food determined by the quantity of soldiers on the card and your {svgs.resistance} resistance.</p>
            </details>
          </details>
        </section>
    );
}
  
export default Help;