import '../../css/App.css'
import StepMap from "./StepMap";

export default function History({history, jumpTo, isXFirst, resign}) {
    var stepNumber = 0;
    return (
        <div className="panel-history">
            <div className="history">
                {history.map((step, index) => {

                    const player = (index % 2 === 0)
                        ? (isXFirst ? 'Player O' : 'Player X')
                        : (isXFirst ? 'Player X' : 'Player O');

                    if (step.every(slot => slot === null)) {
                        return null;
                    }
                    stepNumber++;
                    return (
                        <div key={index} className="history-row">
                            <div className="number">
                                <p>{index}</p>
                            </div>
                            <h3 className="history-player">{player}</h3>
                            <StepMap currentHistory={step} previousHistory={history[index - 1] || []}/>
                            <button onClick={() => jumpTo(index-1)}>GO TO THIS MOVE</button>
                        </div>
                    );
                })}
            </div>
            <div className="history-bottom">
                <div className="history-buttons">
                    <button onClick={() => jumpTo(stepNumber - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-caret-left" viewBox="0 1 8 15">
                            <path
                                d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
                        </svg>
                        GO BACK
                    </button>
                    <button onClick={() => jumpTo(0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                             className="bi bi-arrow-repeat" viewBox="0 1 16 16">
                            <path
                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                            <path fillRule="evenodd"
                                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                        </svg>
                        RESTART
                    </button>
                    <button onClick={() => resign(isXFirst ? 'X' : 'O')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                             className="bi bi-flag" viewBox="0 0 16 16">
                            <path
                                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"/>
                        </svg>
                        RESIGN
                    </button>
                </div>
            </div>
        </div>
    );
}