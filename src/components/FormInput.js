import { useController } from 'react-hook-form';

function FormInput(props) {
	const { type, label, name, error, register } = props;
	const { field } = useController(props);
	return (
		<div className='m-2'>
			<label className='block my-1 w-full font-bold text-lg'>{label}</label>
			<input
				ref={register}
				type={type}
				name={name}
				{...field}
				className='block my-1 w-full p-2 text-lg border rounded'
				required
			></input>
			{error ? (
				<ul>
					{error.map((err) => {
						return <li>{err.message}</li>;
					})}
				</ul>
			) : (
				''
			)}
		</div>
	);
}

export default FormInput;
