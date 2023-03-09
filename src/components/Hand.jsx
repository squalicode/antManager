import uuid from "react-uuid";
import Card from "./Card";

function Hand({ cards, svgs, parameter }) {
    return (
        <section aria-labelledby="hand" className="hand">
            <h2 id="hand">Hand</h2>
            { cards.length ?
                <ul>
                    {cards.map( card =>
                    <li key={uuid()}>
                        <Card
                        svgs={svgs}
                        icon={card.icon}
                        title={card.title}
                        explanation={card.explanation}
                        parameter={card.parameter}
                        />
                    </li>)}
                </ul>
                : <p>No cards played yet.</p>
            }
        </section>
    );
}
  
export default Hand;