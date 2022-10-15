import './App.css';
import MainContainer from "./Component/MainContainer";
import MonitorPanel from "./Component/MonitorPanel";
import OptionsPanel from "./Component/OptionsPanel";
import GraphPanel from "./Component/GraphPanel";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import ConfirmButton from "./Component/ConfirmButton";
import FlowImg from "./Component/FlowImg";
import LineChart from "./Component/LineChart";
import CustomImg from "./Component/CustomImg";
import BarChart from "./Component/BarChart";
import alert from "./Component/alert.mp3"


function App() {
    let audio = new Audio(alert)
    const [vid,setVid] = useState('http://127.0.0.1:8000/next_frame')
    const [hideBadFrame,setHideBadFrame] = useState(true)
    const [graphData, setGraphData] = useState({ x: [1], y: [1] })
    const [graph2Data, setGraph2Data] = useState({ x: [1,2,3,4,5,6,7], y: [10,20,5,15,23,23,11] })
    const [graph3Data, setGraph3Data] = useState({ x: [1,2,3,4,5,6,7], y: [10,20,5,15,23,23,11] })
    const [settings, setSettings] = useState()
    const bad = useRef(true)
    const oversizeDistance = useRef()
    const [img, setImg] = useState()

    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    const changeSettings = (NewSettings) => {
        setSettings(NewSettings)
    }


    useEffect(() => {
        getGraph2Data()
        getGraphData()
        getGraph3Data()
        getBadFrame()
        getSettings()
    }, [bad])
    useEffect(() => {
        getSettings()
    }, [])


    const startFlow = () => {
        bad.current = true
        setHideBadFrame(true)
        axios.post('http://127.0.0.1:8000/clear_oversize_queue').then(r => console.log(r))
        setVid('http://127.0.0.1:8000/stream')
    }

    const getSettings = async () => {
        await axios.get('http://127.0.0.1:8000/settings').then(response => {
            setSettings(response.data.big_size)
        })
    }

    const getOversize_distance = async () => {
        await axios.get('http://127.0.0.1:8000/oversize_distance').then(response => {
           oversizeDistance.current = response.data.oversize_distance
        })
    }

    const getBadFrame = async () => {
        if (bad.current) {
            try {
                await sleep(1000)
                await axios.get('http://127.0.0.1:8000/frame_with_oversize')
                    .then(response => {
                        if(response.data.frame_url)
                        {
                            setImg(response.data.frame_url)
                            bad.current = false
                            setHideBadFrame(false)
                            audio.play()
                        } else {
							bad.current = true
							setHideBadFrame(true)
						}
                    }).catch(error => console.log(error))
            } catch (error) {
                console.log(error)
            }
            await getBadFrame()
        }
    }


    const getGraphData = async () => {
		while (true) {
			try {
				await sleep(1000)
				await axios.get('http://127.0.0.1:8000/average_graph')
					.then(response => {
						const kek = { x: graphData.x, y: graphData.y }
						kek.x.push(response.data.time)
						if (kek.x.length > 60) {
							kek.x.shift()
						}
						kek.y.push(response.data.size)
						if (kek.y.length > 60) {
							kek.y.shift()
						}
						setGraphData(kek)
				}).catch(error => console.log(error))
			} catch (error) {
				console.log(error)
			}
		}
    }

    const getGraph2Data = async () => {
		while (true) {
			try {
			await sleep(1000)
			await axios.get('http://127.0.0.1:8000/class_sizes')
				.then(response => {
					const kek = { x: graph2Data.x, y: graph2Data.y }
					kek.y = response.data.sizes
					setGraph2Data(kek)
				}).catch(error => console.log(error))
			} catch (error) {
				console.log(error)
			}
		}
    }

    const getGraph3Data = async () => {
        while (true) {
            try {
                await sleep(1000)
                await axios.get('http://127.0.0.1:8000/size_graph')
                    .then(response => {
                        const kek = { x: graph3Data.x, y: graph3Data.y }
                        kek.x.push(response.data.time)
                        if (kek.x.length > 60) {
                            kek.x.shift()
                        }
                        kek.y.push(response.data.size)
                        if (kek.y.length > 60) {
                            kek.y.shift()
                        }
                        setGraph3Data(kek)
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
                    <FlowImg src={vid} alt='Flow' height={400} width={600}/>
                    <CustomImg src={img} hidden={hideBadFrame}  height={400} width={600} />
                </MonitorPanel>
                <OptionsPanel settings={changeSettings} set={settings}>{oversizeDistance.current}</OptionsPanel>
            </MainContainer>
            <MainContainer>
                <GraphPanel>
                    <LineChart graphData={graphData} Label={"Средний размер камня"}/>
                    <BarChart graph2Data={graph2Data}/>
                    <LineChart graphData={graph3Data} Label={"Максимальный размер камня"}/>
                </GraphPanel>
            </MainContainer>
        </div>
    );
}

export default App;
