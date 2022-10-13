
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
import ReactAudioPlayer from 'react-audio-player';

function App() {
    const [settings, setSettings] = useState()
    const [run, setRun] = useState(true)
    const [img, setImg] = useState('2222')

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    let song = new Audio(alert)

    const changeSettings = (NewSettings) => {
        setSettings(NewSettings)
    }


    useEffect(()=>{
        getImages()
    },[img,run])


    const stopFlow = () => {
        if (run) {
            setRun(false)
            console.log(run)
        } else  {
            setRun(true)
            console.log(run)
            song.play()


        }


    }


    const getImages = async () => {
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




  return (

    <div className="App">
        <MainContainer>
            <ConfirmButton onClick={stopFlow}> Остановить </ConfirmButton>
            <MonitorPanel>
                <img src={img} alt={'belt_image'}>
                </img>
            </MonitorPanel>
            <OptionsPanel settings={changeSettings} stop={stopFlow}/>
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
