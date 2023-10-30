import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { birds } from './birds';
import { range } from 'lodash';

function PullRelease({bird}: {bird: string}) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ last, movement: [mx, my] }) => {
    const down = !last;
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down, config: {
      mass: 1,
      friction: 12,
      tension: 500,
    } })
  })

  // Bind it to a component
  return <animated.div {...bind()} style={{ x, y }} className={'touch-none w-full h-full'}>
    <div className='rounded-2xl w-full aspect-[3/2] bg-contain bg-center scale-100' style={{ backgroundImage: `url('${bird}')` }} />
  </animated.div>
}

const BirdGrid = () => {
  return (
    <div className='grid md:grid-cols-3 w-full h-full overflow-auto gap-10 place-items-center p-10'>
      {birds.map(bird => <PullRelease key={bird} bird={bird} />)}
    </div>
  );
}

const word = 'photography';

function App() {
  return <>
    <div className='h-[100dvh] overflow-hidden bg-black text-white'>
      <div className='flex justify-center'>
      <div className='flex flex-col max-w-md'>
        <p id='name' className='m-4 text-center text-8xl font-serif'>keila</p>
        <div className='flex justify-evenly text-gray-400 -mt-3 mb-3 -mx-8'>
          {range(word.length).map(i => <p key={i}>{word[i]}</p>)}
        </div>
      </div>
      </div>
      <BirdGrid />
    </div>
  </>
}

export default App
