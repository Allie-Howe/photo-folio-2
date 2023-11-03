import { keys, range, values } from 'lodash';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { ImageGrid } from './ImageGrid';
import { selections } from './files';
import InstagramIcon from 'mdi-react/InstagramIcon'
import EmailOutlineIcon from 'mdi-react/EmailOutlineIcon'

const URLS = {
  insta: 'https://www.instagram.com/cairviecorvi/'
}

const word = 'photography';
export const grey = '#AAA'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return <>
    <div className='h-[100dvh] text-white'>
      <Header />
      <div className='flex flex-col gap-5 w-full h-full'>
        <Container>
          <Subheading text='about me' />
          <div className='flex justify-center gap-5'>
            <a href={URLS.insta} target='_blank' rel='noreferrer noopener'>
                <InstagramIcon />
            </a>
            <EmailOutlineIcon />
          </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero ratione dolor, nobis hic adipisci recusandae magnam fugiat eius facilis molestiae alias maxime architecto error accusantium animi consequuntur, quisquam quo debitis. </p>
          <Subheading text='my work' />
        </Container>
        <SelectionArea selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        {values(selections).map((v, i) => i === selectedIndex ? <ImageGrid files={v} /> : null)}
      </div>
    </div>
  </>
}

export default App

interface SelectionAreaProps {
  selectedIndex: number,
  setSelectedIndex: Dispatch<SetStateAction<number>>
}
const SelectionArea = ({selectedIndex, setSelectedIndex}:SelectionAreaProps) => {
  return <div className='flex justify-center gap-5'>
    {keys(selections).map((k, i) => (
      <p
        style={{color: i === selectedIndex ? 'white' : grey, cursor: 'pointer'}}
        onClick={() => setSelectedIndex(i)}
      >
        {k}
      </p>
    ))}
  </div>
}
function Subheading({text}: {text: string}) {
  const diamond = <span className='text-white'>◆</span>

  return <p className={`text-center text-3xl text-[${grey}]`}>{diamond} {text} {diamond}</p>;
}

function Header() {
  return <>
  <div className='fixed top-0 right-0 left-0 bg-black flex flex-col justify-center items-center pt-4 shadow-[0_5px_15px_#FFF6]'>
    <div className='flex justify-center'>
      <div className='flex flex-col max-w-md'>
        <p id='name' className='text-center text-8xl font-serif'>keila</p>
        <div className='flex justify-evenly text-gray-400 -mt-3 mb-3 -mx-8'>
          {range(word.length).map(i => <p key={i}>{word[i]}</p>)}
        </div>
      </div>
    </div>
  </div>
  <div className='my-40'></div>
  </>;
}



function Container({children}: PropsWithChildren) {
  return (<div className='flex flex-col gap-5 mx-5 xl:mx-80'>
    {children}
  </div>
  )
}
