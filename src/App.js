import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import Header from './components/Header';
import Photo from './components/Photo';

function App() {
	const [data, setData] = useState([]);
	const [rover, setRover] = useState('curiosity');
	const [camera, setCamera] = useState('fhaz');
	const [sol, setSol] = useState(0);
	const [loading, setLoading] = useState(false);

	const rovers = ['Curiosity', 'Opportunity', 'Spirit'];
	const [cameras, setCameras] = useState([
		'FHAZ',
		'RHAZ',
		'MAST',
		'CHEMCAM',
		'MAHLI',
		'MARDI',
		'NAVCAM',
	]);

	const updateSelectRover = (rover) => {
		rover = rover.toLowerCase();
		setRover(rover);
	};

	const updateSelectCamera = (camera) => {
		camera = camera.toLowerCase();
		setCamera(camera);
	};

	const updateInputSol = (sol) => {
		setSol(sol);
	};

	useEffect(() => {
		if (rover === 'Curiosity') {
			setCameras([
				'FHAZ',
				'RHAZ',
				'MAST',
				'CHEMCAM',
				'MAHLI',
				'MARDI',
				'NAVCAM',
			]);
		} else {
			setCameras(['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']);
		}
	}, [rover]);

	const onSubmit = (e) => {
		e.preventDefault();

		const url = `http://localhost:4000/?rover=${rover}&camera=${camera}&sol=${sol}`;

		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				console.log(response.data.photos);
				setLoading(false);
				setData(response.data.photos);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className='h-screen w-full absolute font-sans leading-normal tracking-normal bg-gray-800'>
			{/* Header and Form */}
			<section className='mt-12'>
				<Header title={'Mars Photos'} />

				<form
					onSubmit={onSubmit}
					className='mx-auto px-5 py-5 w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-b-lg bg-white'
				>
					<FormSelect
						options={JSON.stringify(rovers)}
						label={'Rover:'}
						name='rover'
						onSelectUpdate={updateSelectRover}
					/>

					<FormSelect
						options={JSON.stringify(cameras)}
						label={'Camera:'}
						name='camera'
						onSelectUpdate={updateSelectCamera}
					/>

					<FormInput
						type={'number'}
						name='sol'
						label={'Sol (Mars Solar Day):'}
						onInputUpdate={updateInputSol}
					/>
					<button
						type='submit'
						className='block m-3 px-3 py-2 bg-blue-500 text-white text-lg rounded '
					>
						Submit
					</button>

					<div className='mx-auto text-center rounded-lg bg-white'>
						{loading ? 'LOADING...' : ''}
					</div>
				</form>
			</section>

			{/* List of pictures from API call */}
			<section>
				<ul className="flex justify-around">
					{data.length > 0
						? data.map((pData) => {
								return <Photo data={pData} />;
						  })
						: ''}
				</ul>
			</section>
		</main>
	);
}

export default App;
