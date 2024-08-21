import {useState} from 'react'
import '../css/App.css'
import xImage from '../assets/x.jpg';
import oImage from '../assets/o.jpg';

function Field({index, slot, step, winner}) {
    const [isFlipped, setIsFlipped] = useState(false);

    function click() {
        if (!winner) {
            setIsFlipped(true);
            step();
        }
    }

    const winnerLine = winner && winner.line.includes(index);
    const fieldColor = slot === "X" ? 'xColor' : 'oColor';

    return (
        <button className={`field ${isFlipped ? 'flipped' : ''}`} onClick={click}>
            <div className={`field-container ${fieldColor} ${winnerLine ? 'winner-line' : ''}`}>
                <div className="field-front"></div>
                <div className="field-back">
                    <img className="field-icon" src={slot === "X" ? xImage : oImage} alt=""/>
                </div>
            </div>
        </button>
    );
}

export default function Gameboard() {
    const [result, setResult] = useState(Array(9).fill(null));
    const [xMove, setXMove] = useState(true);

    function stepClick(index) {
        if (result[index] || winnerCalculation(result)) { return; }
        const step = result.slice();
        step[index] = xMove ? "X" : "O";
        setResult(step);
        setXMove(!xMove);
    }

    const winner = winnerCalculation(result);

    return (
        <>
            <div className="board">
                <div className="row">
                    <Field index={0} slot={result[0]} step={() => stepClick(0)} winner={winner} />
                    <Field index={1} slot={result[1]} step={() => stepClick(1)} winner={winner} />
                    <Field index={2} slot={result[2]} step={() => stepClick(2)} winner={winner}/>
                </div>
                <div className="row">
                    <Field index={3} slot={result[3]} step={() => stepClick(3)} winner={winner}/>
                    <Field index={4} slot={result[4]} step={() => stepClick(4)} winner={winner}/>
                    <Field index={5} slot={result[5]} step={() => stepClick(5)} winner={winner}/>
                </div>
                <div className="row">
                    <Field index={6} slot={result[6]} step={() => stepClick(6)} winner={winner}/>
                    <Field index={7} slot={result[7]} step={() => stepClick(7)} winner={winner}/>
                    <Field index={8} slot={result[8]} step={() => stepClick(8)} winner={winner}/>
                </div>
            </div>
            {winner && (
                <div className="winner">
                    <h1 className="winner-title">WINNER {winner.player === 'X' ? 'BEAVER' : 'CAPYBARA'}</h1>
                    <h3 className="winner-subtitle">(PLAYER {winner.player})</h3>
                    <img className="winner-image" src={winner.player === 'X' ? xImage : oImage} alt=""/>
                </div>
            )}
        </>
    );
}

function winnerCalculation(result) {
    const victoryOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i=0; i<victoryOptions.length; i++) {
        let [a, b, c] = victoryOptions[i];
        if (result[a] && result[a] === result[b] && result[a] === result[c]) {
            return {
                player: result[a],
                line: [a, b, c]
            };
        }
    }
    return null;
}