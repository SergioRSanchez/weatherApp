import { useState } from 'react';

import { ReactComponent as LocationPin } from './assets/locationPin.svg';
import { ReactComponent as Wind } from './assets/wind.svg';
import { ReactComponent as Humidity } from './assets/humidity.svg';
import { ReactComponent as Rain } from './assets/rain.svg';
import { ReactComponent as Leaf } from './assets/leaf.svg';
import { ReactComponent as Time } from './assets/time.svg';
import { ReactComponent as Chart } from './assets/chart.svg';

import closed from './assets/closed.png';
import cloudy from './assets/cloudy.png';
import lightning from './assets/lightning.png';
import rainy from './assets/rainy.png';
import sunny from './assets/sunny.png';


function App() {

  //  Depois colocar a KEY em um .env
  const apiKey = '66ba19186b666343f6fdca1fbe74f216';


  const [ city, setCity ]  = useState('São José do Rio Preto');
  const [ temperature, setTemperature ]  = useState('18');
  const [ weatherIcon, setWeatherIcon ] = useState('nuvens dispersas')
  const [ maxTemperature, setMaxTemperature ]  = useState('22');
  const [ minTemperature, setMinTemperature ]  = useState('16');
  const [ wind, setWind ]  = useState('17');
  const [ humidity, setHumidity ]  = useState('31');
  const [ precipitation, setPrecipitation ]  = useState('10');
  const [ airQualityString, setAirQualityString ]  = useState('Boa');
  const [ airQualityValue, setAirQualityValue ]  = useState('21');
  const [ pm2, setPm2 ]  = useState('12.9');
  const [ pm10, setPm10 ]  = useState('12.9');
  const [ so2, setSo2 ]  = useState('2.1');
  const [ no2, setNo2 ]  = useState('1.4');
  const [ o3, setO3 ]  = useState('21.2');
  const [ co, setCo ]  = useState('0.7');


  async function getWeatherData() {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(data)

    setCity(data.name)
    setTemperature(parseFloat(data.main.temp).toFixed(0))
    setMaxTemperature(parseFloat(data.main.temp_max).toFixed(0))
    setMinTemperature(parseFloat(data.main.temp_min).toFixed(0))
    setWind(parseFloat(data.wind.speed).toFixed(1))
    setHumidity(parseFloat(data.main.humidity).toFixed(0))
    if (data.rain === null || data.rain === undefined) {
      setPrecipitation('-')
    } else {
      setPrecipitation(parseFloat(data.rain).toFixed(0))
    }
    setWeatherIcon(data.weather[0].description)
  };


  return (
    <div className='box-border font-["Lato"] bg-[url("/src/assets/background.png")] bg-cover sm:h-screen flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-8 sm:px-32 py-12'>
      
      <div className='bg-[url("/src/assets/backgroundBlock.png")] sm:w-[480px] sm:h-[480px]  h-[400px] flex flex-col justify-between rounded-[10px]'>
        <div className='flex justify-between relative'>
          {
            weatherIcon === 'algumas nuvens'
            &&
            <img src={closed} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'tempo limpo'
            &&
            <img src={sunny} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'céu limpo'
            &&
            <img src={sunny} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'nuvens dispersas'
            &&
            <img src={cloudy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'névoa'
            &&
            <img src={cloudy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'nublado'
            &&
            <img src={cloudy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'chuva leve'
            &&
            <img src={rainy} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          {
            weatherIcon === 'trovoada'
            &&
            <img src={lightning} className='relative -top-20 -left-2 sm:-top-16 sm:-left-16 w-[176px]' />
          }
          <div className='absolute right-0 flex gap-1 items-center pr-4 pt-4 sm:pr-8 sm:pt-8'>
            <button onClick={getWeatherData}><LocationPin /></button>
            <input onChange={(e) => setCity(e.target.value)} value={city} className='text-[#C2BFF4] text-sm font-bold bg-[#6D67D0] w-36 outline-[#6D67D0] pl-1' />
          </div>
        </div>

        <div className='relative -top-16'>
          <div className='flex justify-center font-bold'>
            <span className='text-white text-[88px] leading-none'>{temperature}</span>
            <span className='text-[#DAD8F7] text-2xl '>ºC</span>
          </div>
          <div className='flex justify-center text-xl font-bold gap-1'>
            <span className='text-white'>{maxTemperature}º</span>
            <span className='text-[#DAD8F7]'>{minTemperature}º</span>
          </div>
        </div>

        <div className='flex justify-between px-1 sm:px-3 mb-3 sm:gap-2 gap-1'>
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Wind className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Vento</p>
              <p className='text-sm text-[#E7E6FB]'>{wind} <span className='text-[#DAD8F7]'>km/h</span></p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Humidity className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Umidade</p>
              <p className='text-sm text-[#E7E6FB]'>{humidity} <span className='text-[#DAD8F7]'>%</span></p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Rain className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Chuva</p>
              <p className='text-sm text-[#E7E6FB]'>{precipitation} <span className='text-[#DAD8F7]'>%</span></p>
            </div>
          </div>


        </div>
      </div>


      <div className='flex flex-col gap-6'>
        <div className='flex flex-col sm:flex-row gap-6'>
          
          <div className='bg-[#6D67D0] pt-8 px-4 pb-4 flex flex-col items-center gap-8 rounded-[10px]'>
            <div className='flex items-center gap-2'>
              <Leaf />
              <p className='font-bold text-[#DAD8F7]'>Qualidade do ar</p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='text-[#87EBCD] font-bold text-lg'>{airQualityString}</p>
              <p className='text-[#E7E6FB] font-bold text-[40px]'>{airQualityValue}</p>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{pm2}</p>
                <p className='text-[#E7E6FB] text-xs'>PM2.5</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{pm10}</p>
                <p className='text-[#E7E6FB] text-xs'>PM10</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{so2}</p>
                <p className='text-[#E7E6FB] text-xs'>SO₂</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{no2}</p>
                <p className='text-[#E7E6FB] text-xs'>NO₂</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{o3}</p>
                <p className='text-[#E7E6FB] text-xs'>O₃</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>{co}</p>
                <p className='text-[#E7E6FB] text-xs'>CO</p>
              </div>
            </div>
          </div>
          
          <div className='bg-[#6D67D0] pt-8 px-4 pb-4 flex flex-col items-center gap-8 rounded-[10px]'>
            <div className='flex items-center gap-2'>
              <Time />
              <p className='font-bold text-[#DAD8F7]'>Horário do sol</p>
            </div>
            <div>
              <Chart />
            </div>
          </div>

        </div>
        
        <div className='bg-[#6D67D0] rounded-[10px] flex flex-col sm:flex-row p-10 gap-3 justify-between'>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>Amanhã</p>
            <img src={cloudy} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>21°</span>
              <span className='text-[#C2BFF4] font-bold'>16°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>Sexta-Feira</p>
            <img src={sunny} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>28°</span>
              <span className='text-[#C2BFF4] font-bold'>20°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>Sábado</p>
            <img src={rainy} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>25°</span>
              <span className='text-[#C2BFF4] font-bold'>21°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>Domingo</p>
            <img src={lightning} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>20°</span>
              <span className='text-[#C2BFF4] font-bold'>14°</span>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <p className='text-[#DAD8F7] font-bold'>Segunda-Feira</p>
            <img src={closed} className='w-[64px]' />
            <div className='flex gap-1'>
              <span className='text-white font-bold'>24°</span>
              <span className='text-[#C2BFF4] font-bold'>18°</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
