import uuid from "react-uuid";
import Card from "./Card";

function Hand({ cards }) {
    return (
        <section className="hand">
            <h2>Hand</h2>
            <div>
                { cards.length ?
                    cards.map( card =>
                        <Card
                            key={uuid()}
                            icon={card.icon}
                            title={card.title}
                            explanation={card.explanation}
                        />
                    ) :
                    <p>No cards played yet.</p>
                }
            </div>
        </section>
    );
}
  
export default Hand;