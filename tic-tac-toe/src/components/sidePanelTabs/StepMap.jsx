import '../../css/App.css'

export default function StepMap({ currentHistory, previousHistory }) {
    const stepMap = Array(9).fill(null);

    const takenStep = currentHistory.map((step, index) => {
        return step !== (previousHistory[index] || null) ? index : null;
    }).filter(index => index !== null);

    return (
        <div className="history-map">
            <div className="history-board">
                {stepMap.map((_, i) => (
                    <div key={i} className={`history-field 
                    ${takenStep.includes(i) ? (currentHistory[i] === 'X' ? 'xColor' : 'oColor') : ''}`}>
                        {takenStep.includes(i) && <span>{currentHistory[i]}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}