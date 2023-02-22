import StatCounter from "./StatCounter";
import Hand from "./Hand";

function Results({ people, ants, eggs, food, eggPointValue, foodPointValue, cardsOnHand }) {
    return (
        <>
            <section className="results">
                <h2>Results</h2>
                <div>
                    <h3>Scoring</h3>
                    {people ? <p>1 👩‍👩‍👧‍👦 person is worth 1 🌟 secret point.</p> : ''}
                    <p>1 🐜 ant is worth 1 ⭐ point.</p>
                    <p>{eggPointValue} ⚪&#xfe0f; eggs are worth 1 ⭐&#xfe0f; point.</p>
                    <p>{foodPointValue} 🍒&#xfe0f; food is worth 1 ⭐&#xfe0f; point.</p>
                </div>
                <div>
                    <h3>Things</h3>
                    {people ?
                        <p><StatCounter stat='people' icon='👩‍👩‍👧‍👦' amount={people} />
                            {(people === 8000000000) ? <small><br/>(the entire Earth population)</small> : ''}
                        </p> :
                        ''}
                    <p><StatCounter stat='ants' icon='🐜' amount={ants} /></p>
                    <p><StatCounter stat='eggs' icon='⚪' amount={eggs} /></p>
                    <p><StatCounter stat='food' icon='🍒' amount={food} /></p>
                </div>
                <div>
                    <h3>Points</h3>
                    <p><span className='secret-points'>🌟{people}🌟</span></p>
                    <p><span className='points'>⭐{ants + Math.floor(eggs/eggPointValue) + Math.floor(food/foodPointValue)}⭐</span></p>
                </div>
            </section>
            <Hand cards={cardsOnHand}/>
        </>
    );
}
  
export default Results;