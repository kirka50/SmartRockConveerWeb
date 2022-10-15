
import './App.css';
import MainContainer from "./Component/MainContainer";
import MonitorPanel from "./Component/MonitorPanel";
import OptionsPanel from "./Component/OptionsPanel";
import GraphPanel from "./Component/GraphPanel";
import { useEffect, useState } from "react";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";
import ConfirmButton from "./Component/ConfirmButton";
import alert from './Component/alert.mp3'
import { Player, ControlBar, BigPlayButton } from 'video-react'
import bongo from './Component/bongo.mp4'
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto'
import FlowImg from "./Component/FlowImg";
import LineChart from "./Component/LineChart";
import CustomImg from "./Component/CustomImg";






function App() {
    const [hideBadFrame,setHideBadFrame] = useState(true)
    const [hideFlow, setHideFlow] = useState(false)
    const [graphData, setGraphData] = useState({ x: [1, 2, 3, 4, 5, 6], y: [1, 2, 3, 4, 5, 6], y2:[2, 4, 6, 8, 10, 12] })
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

        //getData()
    }, [run])


    const startFlow = () => {
        setHideFlow(false)
        setRun(true)
        setHideBadFrame(true)
    }

    const getData = async () => {
        if (run) {
            try {
                await sleep(1000)
                await axios.get('https://gold.app.sosus.org/data')
                    .then(response => {
                        setGraphData(response.data.graph)
                        if (response.data.negabaritFrame == true) {
                            setImg(response.data.negabaritFrame)
                            setHideFlow(false)
                            setRun(false)
                            setHideBadFrame(false)
                        }
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
                    <FlowImg hide={hideFlow}/>
                    <CustomImg src={img} hide={hideBadFrame}/>
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
