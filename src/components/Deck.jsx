import uuid from "react-uuid";
import Card from "./Card";

function Deck({svgs, cards, actionList, food, eggs, ants, people, fertility, intelligence, resistance, attack, luck, turn, raid}) {
    return <section aria-labelledby="deck" className="deck" aria-live="polite">
        <h2 id="deck">Deck</h2>
        <ul>
            {/* When it's the raid turn, only the raid card is shown and there's no button to pass the turn without taking the card */}
            {(raid.turn === turn) ?
                <li>
                    <div className="raid buyable card">
                        <h3>
                            <button onClick={() => {
                                actionList['runRaid']();
                                actionList['buyFromDeck'](
                                    {
                                        icon: 'raid',
                                        title: 'Raid',
                                        explanation: <>
                                            {svgs.attack} attack: <span className="data">{raid.attack}</span><br/>
                                            {svgs.ants} soldiers: <span className="data">{raid.soldiers}</span><br/>
                                        </>
                                    });
                                actionList['endTurn']();
                                }}>
                                {svgs.raid} Raid
                            </button>
                        </h3>
                        <div>
                            <div>
                                <p>Lose ants and food, or resist and recruit the enemies.</p>
                            </div>
                            <div>
                                <p>{svgs.attack} attack: <span className="data">{raid.attack}</span></p>
                                <p>{svgs.ants} soldiers: <span className="data">{raid.soldiers}</span></p>
                            </div>
                        </div>
                    </div>
                </li>
                : <>{cards.length ?
                    <>{cards.map( card => {
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

                            case 'people':
                                buyable = !(people < card.cost);
                                break;
                        
                            default:
                                break;
                        }

                        return <li key={uuid()}>
                                <Card
                                svgs={svgs}
                                icon={card.icon}
                                title={card.title}
                                explanation={card.explanation}
                                action={
                                    () => {
                                        // Apply the card's effect
                                        actionList[card.action](card.parameter, card.amount);

                                        if(card.action !== 'worldDomination') {
                                            // Remove the amount of things that the card costs
                                            if (card.cost) {actionList['change'](card.costCurrency, -card.cost);}
                                            // Place card in hand
                                            actionList['buyFromDeck'](card);
                                            
                                            actionList['endTurn']();
                                        }
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
                            </li>
                    })}</> : <li><p>Your {svgs.intelligence} intelligence is too low!<br/>No cards are available to choose.</p></li>
                }</>
            }
        </ul>
        {(raid.turn !== turn) ? <button onClick={() => {actionList['endTurn']();}}>Pass turn</button> : <button disabled>Pass turn</button>}
    </section>
}
  
export default Deck;