import {useState} from 'react'
import '../css/App.css'
import xImage from '../assets/x.jpg';
import oImage from '../assets/o.jpg';

function Field({value, slot, step}) {
    const [image, setImage] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    function click() {
        console.log(`Field №${value} was clicked!`);
        setImage(xImage);
        setIsFlipped(true);
        step();
    }

    return (
        <button className={`field ${isFlipped ? 'flipped' : ''}`} onClick={click}>
            <div className="field-container">
                <div className="field-front"></div>
                <div className="field-back">
                    <img className="field-icon" src={image} alt=""/>
                </div>
            </div>
        </button>
    );
}

export default function Gameboard() {
    const [result, setResult] = useState(Array(9).fill(null));

    function stepClick(index) {
        const step = result.slice();
        step[index] = "X";
        setResult(step);
    }

    return (
        <>
            <div className="board">
                <div className="row">
                    <Field value="1" slot={result[0]} step={() => stepClick(0)}/>
                    <Field value="2" slot={result[1]} step={() => stepClick(1)}/>
                    <Field value="3" slot={result[2]} step={() => stepClick(2)}/>
                </div>
                <div className="row">
                    <Field value="4" slot={result[3]} step={() => stepClick(3)}/>
                    <Field value="5" slot={result[4]} step={() => stepClick(4)}/>
                    <Field value="6" slot={result[5]} step={() => stepClick(5)}/>
                </div>
                <div className="row">
                    <Field value="7" slot={result[6]} step={() => stepClick(6)}/>
                    <Field value="8" slot={result[7]} step={() => stepClick(7)}/>
                    <Field value="9" slot={result[8]} step={() => stepClick(8)}/>
                </div>
            </div>
        </>
    );
}