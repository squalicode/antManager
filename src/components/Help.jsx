function Help({ turnTotal, eggPointValue, foodPointValue }) {
    return (
        <section className="help">
          <h2>Help</h2>
          <details>
            <summary>The game</summary>
                <details>
                    <summary>Ant manager</summary>
                    <p><i>Ant manager</i> is a turn-based strategy game.</p>
                    <p>Your objective is to end up with as many 🐜&#xfe0f; ants, ⚪&#xfe0f; eggs and 🍒&#xfe0f; food as possible by the end of the game.</p>
                    <p>1 🐜&#xfe0f; ant is worth 1 ⭐&#xfe0f; point.</p>
                    <p>{eggPointValue} ⚪&#xfe0f; eggs are worth 1 ⭐&#xfe0f; point.</p>
                    <p>{foodPointValue} 🍒&#xfe0f; food is worth 1 ⭐&#xfe0f; point.</p>
                </details>
                <details>
                    <summary>About cards</summary>
                    <p>Cards on the deck are shuffled every turn, and move to your hand when you take them. Every turn you can take 1 card or pass the turn without taking any.</p>
                    <p>Cards have different effects that are applied when you take them. They can have a cost that you need to pay with items or stats.</p>
                    <p>The amount of cards available to choose from on the deck is determined by 🧠&#xfe0f; intelligence.</p>
                </details>
                <details>
                    <summary>About turns</summary>
                    <p>The game ends after {turnTotal} turns have passed. Turns are divided into 4 rounds (🍂&#xfe0f; seasons) of {turnTotal/4} turns each.</p>
                    <p>Your turn progress can be viewed in the "time" panel. The current turn is outlined in a different color. Turns with a round shape signify hatching turns (⚪&#xfe0f; eggs hatch into 🐜&#xfe0f; ants when the turn ends). Turns with a bigger size mark the end of a 🍂&#xfe0f; season.</p>
                </details>
          </details>
          <details>
            <summary>Items and stats</summary>
            <details>
                <summary>About 🐜&#xfe0f; ants</summary>
                <p>Each 🐜&#xfe0f; ant is worth 1 ⭐&#xfe0f; point.</p>
                <p>At the end of each turn, your colony searches for 🍒&#xfe0f; food. The amount of 🍒&#xfe0f; food that it finds is influenced by the amount of 🐜&#xfe0f; ants, 🍀&#xfe0f; luck, temperature and 💎&#xfe0f; resistance.</p>
            </details>
            <details>
                <summary>About ⚪&#xfe0f; eggs</summary>
                <p>{eggPointValue} ⚪&#xfe0f; eggs are worth 1 ⭐&#xfe0f; point.</p>
                <p>They are laid by the queen every turn. The amount depends on the queen's ✨&#xfe0f; fertility. ⚪&#xfe0f; Eggs hatch into 🐜&#xfe0f; ants at the end of every turn marked with a round shape (every 5 turns).</p>
            </details>
            <details>
                <summary>About 🍒&#xfe0f; food</summary>
                <p>{foodPointValue} 🍒&#xfe0f; food are worth 1 ⭐&#xfe0f; point.</p>
                <p>The amount of 🍒&#xfe0f; food your colony finds every turn is influenced by the amount of 🐜&#xfe0f; ants, 🍀&#xfe0f; luck, temperature and 💎&#xfe0f; resistance.</p>
            </details>
            <details>
                <summary>About ✨&#xfe0f; fertility</summary>
                <p>Your queen's ✨&#xfe0f; fertility will determine the amount of ⚪&#xfe0f; eggs she lays every turn.</p>
            </details>
            <details>
                <summary>About 🧠&#xfe0f; intelligence</summary>
                <p>Your queen's 🧠&#xfe0f; intelligence will determine the amount of cards available to choose in the deck. If your 🧠&#xfe0f; intelligence gets to 0, you will only be able to pass the turn.</p>
            </details>
            <details>
                <summary>About 💎&#xfe0f; resistance</summary>
                <p>Your 🐜&#xfe0f; ants' 💎&#xfe0f; resistance influences how much 🍒&#xfe0f; food they can find every turn, as it protects them a little against extreme temperatures. It also protects them from 💀&#xfe0f; raid attacks, if they're triggered.</p>
            </details>
            <details>
                <summary>About 🗡&#xfe0f; attack</summary>
                <p>Your 🐜&#xfe0f; ants' 🗡&#xfe0f; attack, if higher or equal than a 💀&#xfe0f; raid's, will prevent an enemy attack.</p>
            </details>
            <details>
                <summary>About 🍀&#xfe0f; luck</summary>
                <p>Your 🐜&#xfe0f; ants' 🍀&#xfe0f; luck influences how much 🍒&#xfe0f; food they can find every turn and the power of the 💀&#xfe0f; raids that generate.</p>
            </details>
          </details>
          <details>
            <summary>Events</summary>
            <details>
                <summary>About 🍂&#xfe0f; seasons</summary>
                <p>🍂&#xfe0f; Seasons change every round ({turnTotal/4} turns) and determine the overall temperature, which can vary slightly each turn.</p>
            </details>
            {/*<details>
                <summary>About 🌦&#xfe0f; weather</summary>
                <p>Temperature varies every turn and it's influenced by the current 🍂&#xfe0f; season.</p>
            {/* </details> */}
            <details>
                <summary>About 💀&#xfe0f; raids</summary>
                <p>A raid card generates in a random turn each 🍂&#xfe0f; season except in 🌸 spring. It appears in the deck as the only action you can take, with a random 🗡&#xfe0f; attack and soldier amount. 💀&#xfe0f; Raids get a little stronger every 🍂&#xfe0f; season and as you gain more 🐜&#xfe0f; ants.</p>
                <p>If your 🐜&#xfe0f; ants' 🗡&#xfe0f; attack is higher or equal to the card's, you will recruit the enemy soldiers as your own 🐜&#xfe0f; ants.</p>
                <p>Otherwise, you will lose an amount of 🐜&#xfe0f; ants and 🍒&#xfe0f; food determined by the quantity of soldiers on the card and your 💎&#xfe0f; resistance.</p>
            </details>
          </details>
        </section>
    );
}
  
export default Help;