import {useState, useEffect} from 'react'
import '../css/App.css'
import xImage from '../assets/x.jpg';
import oImage from '../assets/o.jpg';
import Score from "./Score.jsx";
import SidePanel from "./SidePanel.jsx";

function Field({index, slot, step, winner, resetFlipped}) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (resetFlipped) {
            setIsFlipped(false);
        }
    }, [resetFlipped]);

    function click() {
        if (!winner && !slot) {
            setIsFlipped(true);
            step(index);
        }
    }

    useEffect(() => {
        setIsFlipped(!!slot);
    }, [slot]);

    const winnerLine = winner && winner !== 'tie' && winner.line.includes(index);
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
    const [score, setScore] = useState([0, 0]);
    const [winner, setWinner] = useState(null);
    const [resetFlipped, setResetFlipped] = useState(false);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXFirst, setIsXFirst] = useState(true);

    function stepClick(index) {
        if (result[index] || winnerCalculation(result)) { return; }
        const stepHistory = history.slice(0, stepNumber + 1);
        const currentStep = [...stepHistory[stepHistory.length - 1]];
        currentStep[index] = xMove ? "X" : "O";
        setHistory([...stepHistory, currentStep]);
        setResult(currentStep);
        setStepNumber(stepHistory.length);
        setXMove(!xMove);
    }

    function updateScore(player) {
        setScore(prevScore => {
            const newScore = [...prevScore];
            if (player === 'X') {
                newScore[1]++;
            } else {
                newScore[0]++;
            }
            return newScore;
        });
    }

    useEffect(() => {
        const currentStep = history[stepNumber];
        setResult(currentStep);

        const isWinner = winnerCalculation(result);
        setWinner(isWinner);

        if (isWinner && isWinner !== 'tie') {
            updateScore(isWinner.player);
        }
    }, [result, history, stepNumber]);

    const exitGame = () => {
        setResult(Array(9).fill(null));
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setScore([0, 0]);
        setXMove(true);
        setWinner(null);
        setResetFlipped(true);
        setTimeout(() => setResetFlipped(false), 0);
    };

    const startNextGame = () => {
        setResult(Array(9).fill(null));
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setIsXFirst(prev => !prev);
        setXMove(!isXFirst);
        setWinner(null);
        setResetFlipped(true);
        setTimeout(() => setResetFlipped(false), 0);
    };

    function jumpTo(step) {
        if(step < 0) { return; }
        setStepNumber(step);
        setXMove(step % 2 === 0 ? isXFirst : !isXFirst);
        setHistory(history.slice(0, step + 1));
    }

    function resign(player) {
        setWinner({ player: player, line: [] });
        updateScore(player);
    }

    return (
        <>
            <div>
                <Score score={score} className="scoreboard"/>
                <div className="board">
                    <div className="row">
                        <Field index={0} slot={result[0]} step={() => stepClick(0)} winner={winner}
                               resetFlipped={resetFlipped}/>
                        <Field index={1} slot={result[1]} step={() => stepClick(1)} winner={winner}
                               resetFlipped={resetFlipped}/>
                        <Field index={2} slot={result[2]} step={() => stepClick(2)} winner={winner}
                               resetFlipped={resetFlipped}/>
                    </div>
                    <div className="row">
                        <Field index={3} slot={result[3]} step={() => stepClick(3)} winner={winner}
                               resetFlipped={resetFlipped}/>
                        <Field index={4} slot={result[4]} step={() => stepClick(4)} winner={winner}
                               resetFlipped={resetFlipped}/>
                        <Field index={5} slot={result[5]} step={() => stepClick(5)} winner={winner}
                               resetFlipped={resetFlipped}/>
                    </div>
                    <div className="row">
                        <Field index={6} slot={result[6]} step={() => stepClick(6)} winner={winner}
                               resetFlipped={resetFlipped}/>
                        <Field index={7} slot={result[7]} step={() => stepClick(7)} winner={winner}
                               resetFlipped={resetFlipped}/>
                        <Field index={8} slot={result[8]} step={() => stepClick(8)} winner={winner}
                               resetFlipped={resetFlipped}/>
                    </div>
                </div>
                {winner ? (
                    <div className="winner">
                        {winner !== 'tie' ? (
                            <>
                                <h1 className="winner-title">WINNER {winner.player === 'X' ? 'BEAVER' : 'CAPYBARA'}</h1>
                                <h3 className="winner-subtitle">(PLAYER {winner.player})</h3>
                                <Score score={score} className="scoreboard-no-background"/>
                                <img className="winner-image" src={winner.player === 'X' ? xImage : oImage} alt=""/>
                            </>
                        ) : (
                            <>
                                <h1 className="winner-title">NO WINNER – TIE</h1>
                                <Score score={score} className="scoreboard-no-background"/>
                            </>
                        )}
                        <div className="winner-buttons">
                            <button className="winner-exit" onClick={exitGame}>EXIT</button>
                            <button className="winner-next-game" onClick={startNextGame}>NEXT GAME</button>
                        </div>
                    </div>
                ) : null}
            </div>
            <SidePanel history={history} jumpTo={jumpTo} isXFirst={isXFirst} resign={resign} />
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

    for (let i = 0; i < victoryOptions.length; i++) {
        let [a, b, c] = victoryOptions[i];
        if (result[a] && result[a] === result[b] && result[a] === result[c]) {
            return {
                player: result[a],
                line: [a, b, c]
            };
        }
    }
    if (!result.includes(null)) {
        return 'tie';
    }
    return null;
}