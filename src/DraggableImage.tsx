import { FileResolutions } from './files';
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
  return <div className='flex flex-col w-full justify-center items-center h-full' onClick={resetSelected}>
    <div className='relative'>
      <img src={file.high} className={`max-h-[90dvh] max-w-[90dvw] ${ASPECT_RATIO}`} />
      <p className='md:hidden absolute top-0 text-center w-full text-xl opacity-50' style={{ textShadow: '0 0 5px black' }}>pinch to zoom</p>
    </div>
  </div>;
}
