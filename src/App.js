import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import Footer from './components/Footer';
import Header from './components/Header';
import Photo from './components/Photo';

function App() {
	const [data, setData] = useState([]);
	const [errors, setErrors] = useState([]);
	const [rover, setRover] = useState('curiosity');
	const [camera, setCamera] = useState('fhaz');
	const [sol, setSol] = useState(0);
	const [loading, setLoading] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);

	// Rover options
	const rovers = ['Curiosity', 'Opportunity', 'Spirit'];
	// Initial camera options
	const [cameras, setCameras] = useState([
		'FHAZ',
		'RHAZ',
		'MAST',
		'CHEMCAM',
		'MAHLI',
		'MARDI',
		'NAVCAM',
	]);

	/**
	 * Updates rover state after changing select option
	 * @param {string} rover
	 */
	const updateSelectRover = (rover) => {
		if (typeof rover !== 'string') return;

		rover = rover.toLowerCase();
		setRover(rover);
	};

	/**
	 * Updates camera state after changing select option
	 * @param {string} camera
	 */
	const updateSelectCamera = (camera) => {
		if (typeof camera !== 'string') return;

		camera = camera.toLowerCase();
		setCamera(camera);
	};

	/**
	 * Updates sol state after changing input
	 * @param {string} sol
	 */
	const updateInputSol = (sol) => {
		if (typeof sol !== 'string') return;

		sol = Number.parseInt(sol);
		setSol(sol);
	};

	/**
	 * Conditionally renders camera options based on rover selection. Renders each time a rover is changed.
	 */
	useEffect(() => {
		if (rover === 'curiosity') {
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

	/**
	 * Sends query to backend and responds with JSON data
	 * @param {button} e
	 */
	const onSubmit = (e) => {
		e.preventDefault();

		const url = `https://mars-photos-api.herokuapp.com/?rover=${rover}&camera=${camera}&sol=${sol}`;

		// Renders loading <li>
		setLoading(true);

		axios
			.get(url)
			.then((response) => {
				// Loading is done. Remove <li>
				setLoading(false);
				// Now will show if query is empty
				setInitialLoad(false);
				if (response.errors) {
					// if errors from api then set errors
					setErrors(response.errors);
				} else {
					// Sets response to data state to render
					setData(response.data.photos);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className='w-full min-h-screen absolute font-sans leading-normal tracking-normal bg-gray-800'>
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
						{loading ? (
							<div>
								<svg
									className='animate-spin h-5 w-5 mr-3 ...'
									viewBox='0 0 24 24'
								></svg>
								Loading...
							</div>
						) : (
							''
						)}
					</div>

					{/* Informs if query is empty */}
					{!initialLoad && data.length === 0 ? (
						<p className='bg-white p-5 text-center rounded-full'>
							Sorry. There are no photos from this query. Please
							try again.
						</p>
					) : (
						''
					)}

					{/* List errors from submit if any */}
					<ul>
						{errors
							? errors.map((error) => {
									return <li>{error.msg}</li>;
							  })
							: ''}
					</ul>
				</form>
			</section>

			{/* List of pictures from API call */}
			<section className='mt-5'>
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10'>
					{data.map((pData) => {
						return <Photo key={pData.id} data={pData} />;
					})}
				</ul>
			</section>

			<Footer />
		</main>
	);
}

export default App;
