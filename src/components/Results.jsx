import StatCounter from "./StatCounter";
import Hand from "./Hand";

function Results({ svgs, people, ants, eggs, food, eggPointValue, foodPointValue, cardsOnHand }) {
    // When the results are announced in the aria-live region, the elements are read without inserting pauses between paragraphs/headings
    // This const is to insert a visually-hidden colon that will make the screen reader pause before reading the next element
    const screenReaderPause = <span aria-label="."></span>;

    return (
        <>
            <section className="results stats" aria-labelledby="results">
                <h2 id="results">Results{screenReaderPause}</h2>
                <div>
                    <div>
                        <h3>Scoring{screenReaderPause}</h3>
                        {people ? <p><span className="data">1</span> {svgs.people} person is worth <span className="data">1</span> {svgs.secretPoints} secret point.</p> : ''}
                        <p><span className="data">1</span> {svgs.ants} ant is worth <span className="data">1</span> {svgs.points} point.</p>
                        <p><span className="data">{eggPointValue}</span> {svgs.eggs} eggs are worth <span className="data">1</span> {svgs.points} point.</p>
                        <p><span className="data">{foodPointValue}</span> {svgs.food} food is worth <span className="data">1</span> {svgs.points} point.</p>
                    </div>
                    <div>
                        <h3>Items{screenReaderPause}</h3>
                        {people ?
                            <p><StatCounter stat='people' icon={svgs.people} amount={people} />
                                {(people === '8000000000') ? <small><br/>(the entire {svgs.earth} Earth population)</small> : ''}{screenReaderPause}</p> :
                            ''}
                        <p><StatCounter stat='ants' icon={svgs.ants} amount={ants} />{screenReaderPause}</p>
                        <p><StatCounter stat='eggs' icon={svgs.eggs} amount={eggs} />{screenReaderPause}</p>
                        <p><StatCounter stat='food' icon={svgs.food} amount={food} />{screenReaderPause}</p>
                    </div>
                    <div>
                        <h3>Points{screenReaderPause}</h3>
                        {people ? <p><span className='secret-points'>{svgs.secretPoints} {people} {svgs.secretPoints}</span>{screenReaderPause}</p> : ''}
                        <p><span className='points'>{svgs.points} {ants + Math.floor(eggs/eggPointValue) + Math.floor(food/foodPointValue)}{screenReaderPause} {svgs.points}</span></p>
                    </div>
                </div>
                
            </section>
            <Hand svgs={svgs} cards={cardsOnHand}/>
        </>
    );
}
  
export default Results;