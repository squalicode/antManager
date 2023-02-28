import uuid from "react-uuid";
import Card from "./Card";

function Hand({ cards, svgs, parameter }) {
    return (
        <section className="hand">
            <h2>Hand</h2>
            <div>
                { cards.length ?
                    cards.map( card =>
                        <Card
                            key={uuid()}
                            svgs={svgs}
                            icon={card.icon}
                            title={card.title}
                            explanation={card.explanation}
                            parameter={card.parameter}
                        />
                    ) :
                    <p>No cards played yet.</p>
                }
            </div>
        </section>
    );
}
  
export default Hand;