import { DraggableImage } from './DraggableImage';
import { FileResolutions } from './files';

export const ImageGrid = ({files}: {files: FileResolutions[]}) => {
return (
<div className='grid md:grid-cols-3 w-full h-full overflow-auto gap-10 place-items-center p-10'>
  {files.map(bird =>
  <DraggableImage key={bird.low} file={bird} />)}
</div>
);
}
