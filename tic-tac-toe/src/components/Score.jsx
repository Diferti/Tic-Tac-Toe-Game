import '../css/App.css'

export default function Score({score, className}) {
    return (
        <>
            <div className={className}>
                <div className="xScore">
                    <h2>Player X</h2>
                    <p id="player-x-score">{score[0]}</p>
                </div>
                <div className="oScore">
                    <h2>Player O</h2>
                    <p id="player-o-score">{score[1]}</p>
                </div>
            </div>
        </>
    );
}