import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { range } from 'lodash';

function PullRelease() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ last, movement: [mx, my] }) => {
    const down = !last;
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: false, config: {
      mass: 1,
      friction: 12,
      tension: 500,
    } })
  })

  // Bind it to a component
  return <animated.div {...bind()} style={{ x, y }} className='h-10 w-10 bg-white' />
}

function App() {
  return (
    <div className='h-[100dvh] overflow-hidden bg-black text-white'>
      <div className='grid grid-cols-3 w-full h-full overflow-auto gap-10 place-items-center p-10'>
        {range(150).map(i => <PullRelease key={i} />)}
      </div>
    </div>
  )
}

export default App
