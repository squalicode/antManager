function Card({icon, title, explanation, parameter, amount, cost, costCurrency, action, inDeck, buyable}) {
    const currencyIcons = {
        ants: '🐜',
        eggs: '⚪',
        food: '🍒',
        fertility: '✨',
        fertilityBonus: '✨',
        intelligence: '🧠',
        intelligenceBonus: '🧠',
        resistance: '💎',
        resistanceBonus: '💎',
        attack: '🗡',
        attackBonus: '🗡',
        luck: '🍀',
        luckBonus: '🍀'
    };

    let parameterFixed;

    switch (parameter) {
        case 'fertilityBonus':
            parameterFixed = 'fertility bonus'
            break;
        case 'intelligenceBonus':
            parameterFixed = 'intelligence bonus'
            break;
        case 'resistanceBonus':
            parameterFixed = 'resistance bonus'
            break;
        case 'attackBonus':
            parameterFixed = 'attack bonus'
            break;
        case 'luckBonus':
            parameterFixed = 'luck bonus'
            break;
        default:
            parameterFixed = parameter;
    }

    return (
        <div className="card">
            <h3>{icon}&#xfe0f; {title}</h3>
            <p>{explanation}</p>
            {inDeck ?
                <>
                    {cost | amount ? <hr/> : <></>}
                    {amount ? <p><b>Gain:</b> {amount} {icon}&#xfe0f; {parameterFixed}</p> : <></>}
                    {cost ? <p><b>Cost:</b> {cost} {currencyIcons[costCurrency]}&#xfe0f; {costCurrency}</p> : <></>}
                    {buyable ? <button onClick={action}>Take</button> : <button disabled>Take</button>}
                </> :
                <></>
            }
        </div>
    );
}
  
export default Card;