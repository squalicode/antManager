import uuid from "react-uuid";
import Card from "./Card";

function Deck({cards, actionList, food, eggs, ants, fertility, intelligence, resistance, attack, luck, turn, raid}) {
    // When it's the raid turn, only the raid card is shown and there's no button to pass the turn without taking the card
    if (raid.turn === turn) {
        return (
            <section className="deck">
                <h2>Deck</h2>
                <div>
                    <div className="card">
                        <h3>💀&#xfe0f; Raid</h3>
                        <p>Lose ants and food, or resist and recruit the enemies.</p>
                        <hr/>
                        <p>🗡&#xfe0f; attack: {raid.attack}</p>
                        <p>🐜&#xfe0f; soldiers: {raid.soldiers}</p>
                        <button onClick={() => {actionList['runRaid'](); actionList['endTurn']();}}>Take</button>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section className="deck">
                <h2>Deck</h2>
                <div>
                    {cards.map( card => {
                        // Check if card is buyable (affects 'buy' button display)
                        let buyable = true;
                        switch (card.costCurrency) {
                            case 'food':
                                buyable = !(food < card.cost);
                                break;
                            
                            case 'eggs':
                                buyable = !(eggs < card.cost);
                                break;

                            case 'ants':
                                buyable = !(ants < card.cost);
                                break;

                            case 'intelligence':
                                buyable = !(intelligence < card.cost);
                                break;

                            case 'resistance':
                                buyable = !(resistance < card.cost);
                                break;

                            case 'attack':
                                buyable = !(attack < card.cost);
                                break;

                            case 'luck':
                                buyable = !(luck < card.cost);
                                break;
                        
                            default:
                                break;
                        }

                        return <Card
                            key={uuid()}
                            icon={card.icon}
                            title={card.title}
                            explanation={card.explanation}
                            action={
                                () => {
                                    // Apply the card's effect
                                    actionList[card.action](card.parameter, card.amount);
                                    // Remove card from deck and place in hand
                                    actionList['buyFromDeck'](card.id);
                                    // Remove the amount of things that the card costs
                                    if (card.cost) {actionList['change'](card.costCurrency, -card.cost);}

                                    actionList['endTurn']();
                                }
                            }
                            amount={card.amount}
                            parameter={card.parameter}
                            actionList={actionList}
                            cost={card.cost}
                            costCurrency={`${card.costCurrency}`}
                            inDeck={true}
                            buyable={buyable}
                        />
                    })}
                </div>
                <button onClick={() => {actionList['endTurn']();}}>Pass turn</button>
            </section>
        );
    }
}
  
export default Deck;