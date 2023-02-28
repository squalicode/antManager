function Card({svgs, icon, title, explanation, parameter, amount, cost, costCurrency, action, inDeck, buyable}) {

    let parameterFixed;

    switch (parameter) {
        case 'peopleBonus':
            parameterFixed = 'people bonus'
            break;
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
        case null:
            parameterFixed = 'event'
            break;
        default:
            parameterFixed = parameter;
    }

    return (
        <div className={`${icon} ${buyable? 'buyable' : ''} card`}>
            <h3>{svgs[icon]} {title}</h3>

            <div>
                <div>
                    <p>{explanation}</p>
                </div>
                {inDeck ?
                    <>
                        {cost | amount ?
                        <>
                            <div>
                                {amount ? <p><b>Gain:</b> <span className="data">{amount}</span> {svgs[parameterFixed.split(' ')[0]]}&#xfe0f; {parameterFixed}</p> : <></>}
                                {cost ? <p><b>Cost:</b> <span className="data">{cost}</span> {svgs[costCurrency]}&#xfe0f; {costCurrency}</p> : <></>}
                            </div>
                        </>
                        : ''}
                    </> :
                    ''
                }
            </div>
            
            {inDeck ? <>{buyable ? <button onClick={action}>Take</button> : <button disabled>Take</button>}</> : ''}
        </div>
    );
}
  
export default Card;