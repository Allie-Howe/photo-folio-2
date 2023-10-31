import { useSpring, animated } from '@react-spring/web';
import { FileResolutions } from './files';
import { useDrag } from '@use-gesture/react';

export function DraggableImage({file}: {file: FileResolutions}) {
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
    <div className='rounded-md w-full aspect-[3/2] bg-[length:100%] bg-center' style={{ backgroundImage: `url('${file.low}')`}} />
  </animated.div>
}
