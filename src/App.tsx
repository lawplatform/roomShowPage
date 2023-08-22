import { createContext, useState } from 'react'
import './App.css'
import Intro from './slide/Intro'
import Warn from './slide/Warn'
import ChoiceMetaverse from './slide/ChoiceMetaverse'
import ChoiceRoom from './slide/ChoiceRoom'
import anime from 'animejs'
import Btn_Confirm from './components/Btn_Confirm'
import Btn_start from './components/Btn_start'
import Btn_Middle from './components/Btn_middle'
import Btn_prev from './components/Btn_prev'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postToAirtable from './api/Room'
import Empty from './slide/Empty'
import LastCheck from './slide/LastCheck'
import Thank from './slide/Thank'
import getCurrentDate from './util/getCurrentDate'
import { State } from './store/State'
import { observe } from '@legendapp/state'

function App() {
	observe(() => {
		console.log(State.Metaverse.get());

	})
	const [currentIndex, setActiveIndex] = useState(0);
	return (

		<>
			<div className=" h-full   object-center sm:items-center  bg-red-200 ">
				<div className="mx-auto w-full max-w-3xl h-full bg-white  flex flex-col justify-center items-center ">
					<div className='flex flex-col px-5  h-full '>
						<div className=' fixed left-0 bottom-0
            flex justify-center items-center w-full '>
							<ChoiceRoom platform={''} next={() => console.log("next")}
								prev={() => console.log("prev")} change={() => console.log("change")}></ChoiceRoom>


						</div>
					</div>
				</div>
			</div >
		</>
	);
}

export default App
