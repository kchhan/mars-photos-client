import { useController } from 'react-hook-form';

function FormSelect(props) {
	const { label, name, error, register } = props;
	const { field } = useController(props);
	const options = JSON.parse(props.options);

	return (
		<div className='m-2'>
			<label className='block my-1 w-full font-bold text-lg'>
				{label}
			</label>
			<select
				ref={register}
				name={name}
				{...field}
				className='block my-1 w-full p-2 text-lg rounded'
				required
			>
				{options.length > 0 ? (
					options.map((opt, index) => {
						return (
							<option key={index} value={opt}>
								{opt}
							</option>
						);
					})
				) : (
					<option>No Options Available</option>
				)}
			</select>
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

export default FormSelect;
