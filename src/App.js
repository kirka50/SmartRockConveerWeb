import './App.css';
import MainContainer from "./Component/MainContainer";
import MonitorPanel from "./Component/MonitorPanel";
import OptionsPanel from "./Component/OptionsPanel";
import GraphPanel from "./Component/GraphPanel";
import {useEffect, useState} from "react";
import axios from "axios";
import ConfirmButton from "./Component/ConfirmButton";
import FlowImg from "./Component/FlowImg";
import LineChart from "./Component/LineChart";
import CustomImg from "./Component/CustomImg";


function App() {
    const [hideBadFrame,setHideBadFrame] = useState(true)
    const [hideFlow, setHideFlow] = useState(false)
    const [graphData, setGraphData] = useState({ x: [1], y: [1] })
    const [graph2Data, setGraph2Data] = useState({ x: [1,2,3,4,5,6,7], y: [1] })
    const [settings, setSettings] = useState()
    const [run, setRun] = useState(true)
    const [img, setImg] = useState('2222')

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    const changeSettings = (NewSettings) => {
        setSettings(NewSettings)
    }


    useEffect(() => {
        //getGraph2Data()
        //getGraphData()
        //getData()
    }, [run,graph2Data])


    const startFlow = () => {
        setHideFlow(false)
        setRun(true)
        setHideBadFrame(true)
    }

    const getGraphData = async () => {
        if (run) {
            try {
                await sleep(1000)
                await axios.get('https://gold.app.sosus.org/graph1')
                    .then(response => {
                        graphData.x.push(response.data.graph1.time)
                        if (graphData.x.length > 60) {
                            graphData.x.pop()
                        }
                        graphData.y.push(response.data.graph1.meanSize)
                        if (graphData.y.length > 60) {
                            graphData.y.pop()
                        }
                        setGraphData(graphData)
                    }).catch(error => console.log(error))
            } catch (error) {
                console.log(error)
            }
        }
    }
    const getGraph2Data = async () => {
        if (run) {
            try {
                await sleep(1000)
                await axios.get('https://gold.app.sosus.org/graph2')
                    .then(response => {
                        let graph = graph2Data
                        graph.y = response.data.graph2.y
                        setGraph2Data(graph)
                    }).catch(error => console.log(error))
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (

        <div className="App">
            <MainContainer>
                <ConfirmButton onClick={startFlow}> Возобновить </ConfirmButton>
                <MonitorPanel>
                    <FlowImg src={""} hidden={hideFlow} alt='Flow' height={400} width={600}/>
                    <CustomImg src={img} hidden={hideBadFrame} />
                </MonitorPanel>
                <OptionsPanel settings={changeSettings} />
            </MainContainer>
            <MainContainer>
                <GraphPanel>
                    <LineChart graphData={graphData}/>
                </GraphPanel>
            </MainContainer>
        </div>
    );
}

export default App;
