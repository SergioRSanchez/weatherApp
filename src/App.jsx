import { useState } from 'react';

import { ReactComponent as LocationPin } from './assets/locationPin.svg';
import { ReactComponent as Clouds } from './assets/clouds.svg';
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

  return (
    <div className='box-border font-["Lato"] bg-[url("/src/assets/background.png")] bg-cover sm:h-screen flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-8 sm:px-32 py-12'>
      
      <div className='bg-[url("/src/assets/backgroundBlock.png")] sm:w-[480px] sm:h-[480px]  h-[400px] flex flex-col justify-between rounded-[10px]'>
        <div className='flex justify-between relative'>
          <Clouds className='relative -top-20 -left-2 sm:-top-16 sm:-left-16' />
          <div className='absolute right-0 flex gap-1 items-center pr-4 pt-4 sm:pr-8 sm:pt-8'>
            <LocationPin />
            <p className='text-[#C2BFF4] text-sm font-bold'>Rio do Sul, SC</p>
          </div>
        </div>

        <div className='relative -top-16'>
          <div className='flex justify-center font-bold'>
            <span className='text-white text-[88px] leading-none'>18</span>
            <span className='text-[#DAD8F7] text-2xl '>ºC</span>
          </div>
          <div className='flex justify-center text-xl font-bold gap-1'>
            <span className='text-white'>22º</span>
            <span className='text-[#DAD8F7]'>16º</span>
          </div>
        </div>

        <div className='flex justify-between px-1 sm:px-3 mb-3 sm:gap-2 gap-1'>
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Wind className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Vento</p>
              <p className='text-sm text-[#E7E6FB]'>17 <span className='text-[#DAD8F7]'>km/h</span></p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Humidity className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Umidade</p>
              <p className='text-sm text-[#E7E6FB]'>31 <span className='text-[#DAD8F7]'>%</span></p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 py-3 px-4 bg-[#6660C899] rounded-md sm:w-[140px]'>
            <Rain className='opacity-40' />
            <div className='text-[#DAD8F7]'>
              <p className='text-xs text-[#E7E6FB]'>Chuva</p>
              <p className='text-sm text-[#E7E6FB]'>10 <span className='text-[#DAD8F7]'>%</span></p>
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
              <p className='text-[#87EBCD] font-bold text-lg'>Boa</p>
              <p className='text-[#E7E6FB] font-bold text-[40px]'>21</p>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>12.9</p>
                <p className='text-[#E7E6FB] text-xs'>PM2.5</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>12.9</p>
                <p className='text-[#E7E6FB] text-xs'>PM10</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>2.1</p>
                <p className='text-[#E7E6FB] text-xs'>SO₂</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>1.4</p>
                <p className='text-[#E7E6FB] text-xs'>NO₂</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>21.2</p>
                <p className='text-[#E7E6FB] text-xs'>O₃</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-[#87EBCD] font-bold text-sm'>0.7</p>
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
