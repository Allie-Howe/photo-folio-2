import { useSpring, animated } from '@react-spring/web';
import { FileResolutions } from './files';
import { useDrag } from '@use-gesture/react';
import { UseState } from './ImageGrid';
import { useCallback } from 'react';

const ASPECT_RATIO = 'aspect-[3/2]'

interface DraggableImageProps {
  selectedImageState: UseState<string | undefined>
  file: FileResolutions
}
export function DraggableImage({file, selectedImageState}: DraggableImageProps) {
  const [selectedImage, setSelectedImage] = selectedImageState;

  const resetSelected = useCallback(() => setSelectedImage(undefined), [setSelectedImage]);

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
  return <>
    <animated.div {...bind()} style={{ x, y }} className={'touch-none w-full h-full'}>
      <div
        className={`rounded-md w-full ${ASPECT_RATIO} bg-[length:100%] bg-center`}
        style={{ backgroundImage: `url('${file.low}')`}}
        onClick={() => setSelectedImage(file.low)}
      />
    </animated.div>
    {/* TODO: This takes a long time to open - try to make it async and show a loading icon */}
    <dialog open={selectedImage === file.low} className='fixed select-none top-0 w-full h-[100dvh] bg-black text-white bg-opacity-70'>
      <div className='flex flex-col w-full justify-center items-center h-full' onClick={resetSelected}>
        <div className='relative'>
          <img src={file.high} className={`max-h-[90dvh] max-w-[90dvw] ${ASPECT_RATIO}`} />
          <p className='md:hidden absolute top-0 text-center w-full text-xl opacity-50' style={{textShadow: '0 0 5px black'}}>pinch to zoom</p>
        </div>
      </div>
    </dialog>
  </>
}
