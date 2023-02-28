import StatCounter from "./StatCounter";
import BonusCounter from "./BonusCounter";

function Stats({ svgs, people, peopleBonus, ants, eggs, food, fertility, fertilityBonus, intelligence, intelligenceBonus, resistance, resistanceBonus, attack, attackBonus, luck, luckBonus }) {
    return (
        <section className="stats">
            <h2>Stats</h2>
            <div>
                <h3>Items</h3>
                {people ?
                    <p><StatCounter stat='people' icon={svgs.people} amount={people} />
                        {peopleBonus ? <> <BonusCounter amount={peopleBonus} /></> : ''}</p> :
                    ''}
                <p><StatCounter stat='ants' icon={svgs.ants} amount={ants} /></p>
                <p><StatCounter stat='eggs' icon={svgs.eggs} amount={eggs} /></p>
                <p><StatCounter stat='food' icon={svgs.food} amount={food} /></p>
            </div>
            <div>
                <h3>Queen</h3>
                <p><StatCounter stat='fertility' icon={svgs.fertility} amount={fertility} /> {fertilityBonus ? <BonusCounter amount={fertilityBonus} /> : ''}</p>
                <p><StatCounter stat='intelligence' icon={svgs.intelligence} amount={intelligence} /> {intelligenceBonus ? <BonusCounter amount={intelligenceBonus} /> : ''}</p>
            </div>
            <div>
                <h3>Colony</h3>
                <p><StatCounter stat='resistance' icon={svgs.resistance} amount={resistance} /> {resistanceBonus ? <BonusCounter amount={resistanceBonus} /> : ''}</p>
                <p><StatCounter stat='attack' icon={svgs.attack} amount={attack} /> {attackBonus ? <BonusCounter amount={attackBonus} /> : ''}</p>
                <p><StatCounter stat='luck' icon={svgs.luck} amount={luck} /> {luckBonus ? <BonusCounter amount={luckBonus} /> : ''}</p>
            </div>
        </section>
    );
}
  
export default Stats;