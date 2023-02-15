import uuid from "react-uuid";

function MessageBoard({ messages }) {
    return (
        <section className="message-board">
            <h2>Message board</h2>
            <ul>
                {messages.map(message => <li key={uuid()}><p>{message}</p></li>)}
            </ul>
        </section>
    );
}
  
export default MessageBoard;