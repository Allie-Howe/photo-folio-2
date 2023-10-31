import { FileResolutions, birds } from './birds';
import { range, values } from 'lodash';
import { useState } from 'react';
import { DraggableImage } from './DraggableImage';

const ImageGrid = ({files}: {files: FileResolutions[]}) => {
  return (
    <div className='grid md:grid-cols-3 w-full h-full overflow-auto gap-10 place-items-center p-10'>
      {files.map(bird => <DraggableImage key={bird.low} file={bird} />)}
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
      <ImageGrid files={birds} />
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
