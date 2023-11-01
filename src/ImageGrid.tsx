import { useState } from 'react';
import { DraggableImage } from './DraggableImage';
import { FileResolutions } from './files';

export type UseState<T> =  [T, React.Dispatch<React.SetStateAction<T>>]

export const ImageGrid = ({files}: {files: FileResolutions[]}) => {
  const selectedImageState = useState<string>();

return (
  <div className='pb-5 px-10'>
    <div className='grid md:grid-cols-3 w-full h-full gap-10'>
      {files.map(bird => <DraggableImage key={bird.low} file={bird} selectedImageState={selectedImageState} />)}
    </div>
  </div>
);
}
