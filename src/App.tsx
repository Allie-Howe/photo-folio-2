import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { FileResolutions, birds } from './birds';
import { range, values } from 'lodash';
import { useState } from 'react';

function PullRelease({bird}: {bird: FileResolutions}) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ last, movement: [mx, my] }) => {
    const down = !last;
    api.start({ x: down ? mx : 0, y: down ? my : 0, config: {
      mass: 1,
      friction: 12,
      tension: 500,
    } })
  })

  // Bind it to a component
  return <animated.div {...bind()} style={{ x, y }} className={'touch-none w-full h-full'}>
    <div className='rounded-2xl w-full aspect-[3/2] bg-contain bg-center' style={{ backgroundImage: `url('${bird.low}')` }} />
  </animated.div>
}

const BirdGrid = () => {
  return (
    <div className='grid md:grid-cols-3 w-full h-full overflow-auto gap-10 place-items-center p-10'>
      {birds.map(bird => <PullRelease key={bird.low} bird={bird} />)}
    </div>
  );
}

const word = 'photography';

function App() {
  return <>
    <div className='h-[100dvh] overflow-hidden bg-black text-white'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center'>
          <div className='flex flex-col max-w-md'>
            <p id='name' className='m-4 text-center text-8xl font-serif'>keila</p>
            <div className='flex justify-evenly text-gray-400 -mt-3 mb-3 -mx-8'>
              {range(word.length).map(i => <p key={i}>{word[i]}</p>)}
            </div>
          </div>
        </div>
          <SelectionArea />
      </div>
      <BirdGrid />
    </div>
  </>
}

export default App

const selections = {
  birds: 'birds',
  birds1: 'birds',
  birds2: 'birds',
} as const

const SelectionArea = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return <div className='flex gap-5'>
    {values(selections).map((v, i) => (
      <p
        style={{color: i === selectedIndex ? '#FFF' : '#AAA', cursor: 'pointer'}}
        onClick={() => setSelectedIndex(i)}
      >
        {v}
      </p>
    ))}
  </div>
}
