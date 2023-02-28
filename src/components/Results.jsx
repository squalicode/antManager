import StatCounter from "./StatCounter";
import Hand from "./Hand";

function Results({ svgs, people, ants, eggs, food, eggPointValue, foodPointValue, cardsOnHand }) {
    return (
        <>
            <section className="results">
                <h2>Results</h2>
                <div>
                    <h3>Scoring</h3>
                    {people ? <p><span className="data">1</span> {svgs.people} person is worth <span className="data">1</span> {svgs.secretPoints} secret point.</p> : ''}
                    <p><span className="data">1</span> {svgs.ants} ant is worth <span className="data">1</span> {svgs.points} point.</p>
                    <p><span className="data">{eggPointValue}</span> {svgs.eggs} eggs are worth <span className="data">1</span> {svgs.points} point.</p>
                    <p><span className="data">{foodPointValue}</span> {svgs.food} food is worth <span className="data">1</span> {svgs.points} point.</p>
                </div>
                <div>
                    <h3>Items</h3>
                    {people ?
                        <p><StatCounter stat='people' icon={svgs.people} amount={people} />
                            {(people === '8000000000') ? <small><br/>(the entire {svgs.earth} Earth population)</small> : ''}
                        </p> :
                        ''}
                    <p><StatCounter stat='ants' icon={svgs.ants} amount={ants} /></p>
                    <p><StatCounter stat='eggs' icon={svgs.eggs} amount={eggs} /></p>
                    <p><StatCounter stat='food' icon={svgs.food} amount={food} /></p>
                </div>
                <div>
                    <h3>Points</h3>
                    {people ? <p><span className='secret-points'>{svgs.secretPoints} {people} {svgs.secretPoints}</span></p> : ''}
                    <p><span className='points'>{svgs.points} {ants + Math.floor(eggs/eggPointValue) + Math.floor(food/foodPointValue)} {svgs.points}</span></p>
                </div>
            </section>
            <Hand svgs={svgs} cards={cardsOnHand}/>
        </>
    );
}
  
export default Results;