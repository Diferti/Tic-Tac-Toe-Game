import './css/App.css'
import Gameboard from "./components/Gameboard.jsx";
import SidePanel from "./components/SidePanel.jsx";

function App() {
    return (
        <>
            <div className="align-game-zone">
                <div><Gameboard/></div>
                <SidePanel/>
            </div>
        </>
    );
}

export default App
