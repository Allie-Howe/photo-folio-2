import { useGesture } from '@use-gesture/react';
import { FileResolutions } from './files';
import { UseState } from './ImageGrid';
import { useCallback, useEffect, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';

const ASPECT_RATIO = 'aspect-[3/2]'

interface DraggableImageProps {
  selectedImageState: UseState<string | undefined>
  file: FileResolutions
}
export function DraggableImage({file, selectedImageState}: DraggableImageProps) {
  const [selectedImage, setSelectedImage] = selectedImageState;

  const resetSelected = useCallback(() => setSelectedImage(undefined), [setSelectedImage]);

  return <>
    <div
      className={`rounded-md w-full ${ASPECT_RATIO} bg-[length:100%] bg-center`}
      style={{ backgroundImage: `url('${file.low}')`}}
      onClick={() => setSelectedImage(file.low)}
    />
    {/* TODO: This takes a long time to open - try to make it async and show a loading icon */}
    <dialog open={selectedImage === file.low} className='fixed select-none top-0 w-full h-[100dvh] bg-black text-white bg-opacity-70'>
      <FullSizeImage resetSelected={resetSelected} file={file} />
    </dialog>
  </>
}

interface FullSizeImageProps {
  resetSelected: () => void,
  file: FileResolutions
}
function FullSizeImage({file, resetSelected}: FullSizeImageProps) {
  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }))
  const ref = useRef<HTMLDivElement>(null)




  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel()
        api.start({ x, y })
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect()
          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [style.x.get(), style.y.get(), tx, ty]
        }

        const x = memo[0] - (ms - 1) * memo[2]
        const y = memo[1] - (ms - 1) * memo[3]
        api.start({ scale: s, rotateZ: a, x, y })
        return memo
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  )

  return <div className='flex flex-col w-full justify-center items-center h-full' onClick={resetSelected}>
      <animated.div
        className={`rounded-md w-full ${ASPECT_RATIO} bg-[length:100%] bg-center max-h-[90dvh] max-w-[90dvw] touch-none`}
        style={{ ...style, backgroundImage: `url('${file.high}')`}}
        onClick={e => e.stopPropagation()}
        ref={ref}
      />
      {/* <p className='md:hidden absolute top-0 text-center w-full text-xl opacity-50' style={{ textShadow: '0 0 5px black' }}>pinch to zoom</p> */}
  </div>;
}
