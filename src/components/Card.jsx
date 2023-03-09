function Card({svgs, icon, title, explanation, parameter, amount, cost, costCurrency, action, inDeck, buyable}) {
    // When new cards are announced in the aria-live region, the elements are read without inserting pauses between paragraphs/headings
    // This const is to insert a visually-hidden colon that will make the screen reader pause before reading the next element
    const screenReaderPause = <span aria-label="."></span>;

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
        <div className={`${icon} ${buyable? 'buyable' : ''} card`} aria-disabled={!(inDeck && buyable)}>
            <h3>
                {inDeck ?
                    <>{buyable ?
                        <button onClick={action}>{svgs[icon]} {title}{screenReaderPause}</button>
                        : <button disabled>{svgs[icon]} {title}{screenReaderPause}</button>}</>
                    : <>{svgs[icon]} {title}{screenReaderPause}</>}
            </h3>

            <div>
                <div>
                    <p>{explanation}</p>
                </div>
                {inDeck ?
                    <>
                        {cost | amount ?
                        <>
                            <div>
                                {amount ? <p><b>Gain:</b> <span className="data">{amount}</span> {svgs[parameterFixed.split(' ')[0]]}&#xfe0f; {parameterFixed}{screenReaderPause}</p> : <></>}
                                {cost ? <p><b>Cost:</b> <span className="data">{cost}</span> {svgs[costCurrency]}&#xfe0f; {costCurrency}{screenReaderPause}</p> : <></>}
                            </div>
                        </>
                        : ''}
                    </> :
                    ''
                }
            </div>
        </div>
    );
}
  
export default Card;