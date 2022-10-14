
import './App.css';
import MainContainer from "./Component/MainContainer";
import MonitorPanel from "./Component/MonitorPanel";
import OptionsPanel from "./Component/OptionsPanel";
import GraphPanel from "./Component/GraphPanel";
import {useEffect, useState} from "react";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import ConfirmButton from "./Component/ConfirmButton";
import alert from './Component/alert.mp3'
import {Player, ControlBar, BigPlayButton} from 'video-react'
import bongo from './Component/bongo.mp4'
import { Line } from 'react-chartjs-2';
import {Chart as Chartjs} from 'chart.js/auto'






function App() {
    const [hide,setHide]= useState(true)
    const [graphData,setGraphData] = useState({x:[1,2,3,4,5,6],y:[6,5,4,3,2,1]})
    const [video, setVideo] = useState('Тест')
    const [settings, setSettings] = useState()
    const [run, setRun] = useState(true)
    const [img, setImg] = useState('2222')

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    const changeSettings = (NewSettings) => {
        setSettings(NewSettings)
    }


    useEffect(()=>{
        //getData()
    },[img,run])


    const stopFlow = () => {
            setRun(true)
            console.log(run)
            setHide(true)
    }

    const getData = async () => {
        if(run){
            try {
                await sleep(1000)
                await axios.get('https://gold.app.sosus.org/data')
                    .then(response => {
                        setVideo(response.data.video)
                        setGraphData(response.data.graph)
                        if (response.data.negabaritFrame === true) {
                            setImg(response.data.negabaritFrame)
                            setHide(false)
                            setRun(false)
                        }
                    }).catch(error => console.log(error))

            } catch (error){
                console.log(error)
            }
        }
    }


   /* const getImages = async () => {
       if(run){
           try {
               await sleep(500)
               await axios.get('https://gold.app.sosus.org/frame')
                   .then(response => {
                       console.log(response.data)
                       setImg(response.data.frame)
                   }).catch(error => console.log(error))

           } catch (error){
               console.log(error)
           }
       }
    }
*/



  return (

    <div className="App">
        <MainContainer>
            <ConfirmButton onClick={stopFlow}> Возобновить </ConfirmButton>
            <MonitorPanel>
                <Player
                        fluid={false}
                        muted={true}
                        autoPlay={true}
                        src={bongo}
                >
                    <ControlBar disableCompletely={true}/>
                    <BigPlayButton disabled/>
                </Player>
                <img src={img} alt={"Негабарит"} hidden={hide}/>
            </MonitorPanel>
            <OptionsPanel settings={changeSettings} stop={stopFlow}/>
        </MainContainer>
        <MainContainer>
           <GraphPanel>
               <Line
                   datasetIdKey='id'
                   data={{
                       labels: graphData.x,
                       datasets: [
                           {
                               id: 1,
                               label: 'Первый',
                               data: graphData.y,
                           },
                           {
                               id: 2,
                               label: 'Второй',
                               data: graphData.y,
                           },
                       ],
                   }}
               height={600}
               width={1080}/>
           </GraphPanel>
        </MainContainer>
    </div>
  );
}

export default App;
