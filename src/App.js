import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import FormInput from './components/FormInput';
import FormSelect from './components/FormSelect';
import Header from './components/Header';

function App() {
	const [data, setData] = useState([]);

	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			sol: 0,
			camera: 'FHAZ',
		},
	});

	const cameras = ['FHAZ', 'MAST', 'NAVCAM'];

	const onSubmit = () => {
		const url = 'http://localhost:4000/';

		axios
			.get(url)
			.then((response) => {
				console.log(response);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main className='h-screen w-full absolute font-sans leading-normal tracking-normal bg-gray-800'>
			{/* Header and Form */}
			<section className="mt-12">
				<Header title={'Mars Photos'} rover={'Curiosity'} />

				<form onSubmit={handleSubmit(onSubmit)} className="mx-auto px-5 py-5 w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-b-lg bg-white">
					<FormInput
						register={register}
						type={'number'}
						name='sol'
						label={'Sol (Mars Solar Day):'}
						control={control}
					/>
					<FormSelect
						register={register}
						options={JSON.stringify(cameras)}
						label={'Camera:'}
						name='camera'
						control={control}
					/>
					<button type='submit' className="block m-3 px-3 py-2 bg-blue-500 text-white text-lg rounded ">Submit</button>
				</form>
			</section>

			{/* List of pictures from API call */}
			<section>
				<ul>{data ? '' : ''}</ul>
			</section>
		</main>
	);
}

export default App;
