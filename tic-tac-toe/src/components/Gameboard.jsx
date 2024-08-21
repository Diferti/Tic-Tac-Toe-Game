import {useState} from 'react'
import '../css/App.css'
import xImage from '../assets/x.jpg';
import oImage from '../assets/o.jpg';

function Field({slot, step, winner}) {
    const [isFlipped, setIsFlipped] = useState(false);

    function click() {
        if (!winner) {
            setIsFlipped(true);
            step();
        }
    }

    return (
        <button className={`field ${isFlipped ? 'flipped' : ''}`} onClick={click}>
            <div className="field-container">
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
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xMove ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                <div className="row">
                    <Field slot={result[0]} step={() => stepClick(0)} winner={winner} />
                    <Field slot={result[1]} step={() => stepClick(1)} winner={winner} />
                    <Field slot={result[2]} step={() => stepClick(2)} winner={winner}/>
                </div>
                <div className="row">
                    <Field slot={result[3]} step={() => stepClick(3)} winner={winner}/>
                    <Field slot={result[4]} step={() => stepClick(4)} winner={winner}/>
                    <Field slot={result[5]} step={() => stepClick(5)} winner={winner}/>
                </div>
                <div className="row">
                    <Field slot={result[6]} step={() => stepClick(6)} winner={winner}/>
                    <Field slot={result[7]} step={() => stepClick(7)} winner={winner}/>
                    <Field slot={result[8]} step={() => stepClick(8)} winner={winner}/>
                </div>
            </div>
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
            return result[a];
        }
    }
    return null;
}