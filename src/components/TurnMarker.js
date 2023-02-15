function TurnMarker({ index, done, current, hatchTurn, seasonTurn }) {
    const classes = 'turn-viewer__turn-marker'
        + `${done ? ' turn-viewer__turn-marker--done' : ''}`
        + `${current ? ' turn-viewer__turn-marker--current' : ''}`
        + `${hatchTurn ? ' turn-viewer__turn-marker--hatch-turn' : ''}`
        + `${seasonTurn ? ' turn-viewer__turn-marker--season-turn' : ''}`;

    return (
        <div className={ classes }>
            { index }
        </div>
    );
}
  
export default TurnMarker;