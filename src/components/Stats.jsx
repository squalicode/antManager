import StatCounter from "./StatCounter";
import BonusCounter from "./BonusCounter";

function Stats({ people, peopleBonus, ants, eggs, food, fertility, fertilityBonus, intelligence, intelligenceBonus, resistance, resistanceBonus, attack, attackBonus, luck, luckBonus }) {
    return (
        <section className="stats">
            <h2>Stats</h2>
            <div>
                <h3>Items</h3>
                {people ?
                    <p><StatCounter stat='people' icon='👩‍👩‍👧‍👦' amount={people} />
                        {peopleBonus ? <> <BonusCounter amount={peopleBonus} /></> : ''}</p> :
                    ''}
                <p><StatCounter stat='ants' icon='🐜' amount={ants} /></p>
                <p><StatCounter stat='eggs' icon='⚪' amount={eggs} /></p>
                <p><StatCounter stat='food' icon='🍒' amount={food} /></p>
            </div>
            <div>
                <h3>Queen</h3>
                <p><StatCounter stat='fertility' icon='✨' amount={fertility} /> {fertilityBonus ? <BonusCounter amount={fertilityBonus} /> : ''}</p>
                <p><StatCounter stat='intelligence' icon='🧠' amount={intelligence} /> {intelligenceBonus ? <BonusCounter amount={intelligenceBonus} /> : ''}</p>
            </div>
            <div>
                <h3>Colony</h3>
                <p><StatCounter stat='resistance' icon='💎' amount={resistance} /> {resistanceBonus ? <BonusCounter amount={resistanceBonus} /> : ''}</p>
                <p><StatCounter stat='attack' icon='🗡' amount={attack} /> {attackBonus ? <BonusCounter amount={attackBonus} /> : ''}</p>
                <p><StatCounter stat='luck' icon='🍀' amount={luck} /> {luckBonus ? <BonusCounter amount={luckBonus} /> : ''}</p>
            </div>
        </section>
    );
}
  
export default Stats;