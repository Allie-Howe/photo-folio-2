import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { birds } from './birds';

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

function App() {
  return (
    <div className='h-[100dvh] overflow-hidden bg-black text-white'>
      <div className='grid md:grid-cols-3 w-full h-full overflow-auto gap-10 place-items-center p-10'>
        {birds.map(bird => <PullRelease key={bird} bird={bird} />)}
      </div>
    </div>
  )
}

export default App
