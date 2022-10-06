
import './App.css';
import MainContainer from "./Component/MainContainer";
import MonitorPanel from "./Component/MonitorPanel";
import OptionsPanel from "./Component/OptionsPanel";
import GraphPanel from "./Component/GraphPanel";

function App() {
  return (
    <div className="App">
        <MainContainer>
            <MonitorPanel>
                1231233333333333333333333333333
            </MonitorPanel>
            <OptionsPanel>
                12333222222222222222222222
            </OptionsPanel>
        </MainContainer>
        <MainContainer>
           <GraphPanel>
               Типа график
           </GraphPanel>
        </MainContainer>
    </div>
  );
}

export default App;
