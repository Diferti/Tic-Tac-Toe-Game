import {useState, useEffect} from 'react'
import '../css/App.css'
import IconSVG from './IconSVG';
import SettingsTab from "./sidePanelTabs/SettingsTab.jsx";
import HistoryTab from "./sidePanelTabs/HistoryTab.jsx";
import ConnectTab from "./sidePanelTabs/ConnectTab.jsx";

function Header({title, iconType, isActive, onClick}) {
    return (
        <>
            <div className={`${isActive ? 'active-header' : 'inactive-header'}`}
            onClick={onClick}>
                <IconSVG
                    type={iconType}
                    color={isActive ? '#E5E7E9' : '#ABB0B7'}
                    width={null}
                    height={isActive ? '22' : '18'}
                />
                <h1>{title}</h1>
            </div>
        </>
    );
}

export default function SidePanel({ history, jumpTo, isXFirst, resign}) {
    const [selected, setSelected] = useState(0);

    const headerClick = (index) => {
        setSelected(index);
    };

    return (
      <>
          <div className="panel">
              <div className="panel-headers">
                  <Header
                      title="SETTINGS"
                      iconType="settings"
                      isActive={selected === 0}
                      onClick={() => headerClick(0)}
                  />
                  <Header
                      title="HISTORY"
                      iconType="history"
                      isActive={selected === 1}
                      onClick={() => headerClick(1)}
                  />
                  <Header
                      title="CONNECT"
                      iconType="connect"
                      isActive={selected === 2}
                      onClick={() => headerClick(2)}
                  />
              </div>
              <div className="panel-content">
                  {selected === 0 && <SettingsTab/>}
                  {selected === 1 && <HistoryTab  history={history} jumpTo={jumpTo} isXFirst={isXFirst} resign={resign}/>}
                  {selected === 2 && <ConnectTab/>}
              </div>
          </div>
      </>
    );
}