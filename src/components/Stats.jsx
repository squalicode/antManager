import StatCounter from "./StatCounter";
import BonusCounter from "./BonusCounter";

function Stats({ svgs, people, peopleBonus, ants, eggs, food, fertility, fertilityBonus, intelligence, intelligenceBonus, resistance, resistanceBonus, attack, attackBonus, luck, luckBonus }) {

    return (
        <section aria-labelledby="stats" className="stats" aria-live="polite">
            <h2 id="stats">Stats</h2>
            <div>
                <h3>Items</h3>
                <ul>
                    {people ?
                        <li aria-atomic="true"><StatCounter stat='people' icon={svgs.people} amount={people} />
                            {peopleBonus ? <> <BonusCounter amount={peopleBonus} /></> : ''}</li> :
                    ''}
                    <li aria-atomic="true"><StatCounter stat='ants' icon={svgs.ants} amount={ants} /></li>
                    <li aria-atomic="true"><StatCounter stat='eggs' icon={svgs.eggs} amount={eggs} /></li>
                    <li aria-atomic="true"><StatCounter stat='food' icon={svgs.food} amount={food} /></li>
                </ul>
            </div>
            <div>
                <h3>Queen</h3>
                <ul>
                    <li aria-atomic="true"><StatCounter stat='fertility' icon={svgs.fertility} amount={fertility} /> {fertilityBonus ? <BonusCounter amount={fertilityBonus} /> : ''}</li>
                    <li aria-atomic="true"><StatCounter stat='intelligence' icon={svgs.intelligence} amount={intelligence} /> {intelligenceBonus ? <BonusCounter amount={intelligenceBonus} /> : ''}</li>
                </ul>
            </div>
            <div>
                <h3>Colony</h3>
                <ul>
                    <li aria-atomic="true"><StatCounter stat='resistance' icon={svgs.resistance} amount={resistance} /> {resistanceBonus ? <BonusCounter amount={resistanceBonus} /> : ''}</li>
                    <li aria-atomic="true"><StatCounter stat='attack' icon={svgs.attack} amount={attack} /> {attackBonus ? <BonusCounter amount={attackBonus} /> : ''}</li>
                    <li aria-atomic="true"><StatCounter stat='luck' icon={svgs.luck} amount={luck} /> {luckBonus ? <BonusCounter amount={luckBonus} /> : ''}</li>
                </ul>
            </div>
        </section>
    );
}
  
export default Stats;