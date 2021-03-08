function FormInput(props) {
	const { type, label, name, error } = props;

	/**
	 * Sends value to App.js
	 * @param {sting} e
	 */
	const handleChange = (e) => {
		props.onInputUpdate(e.target.value);
	};

	return (
		<div className='m-2'>
			<label className='block my-1 w-full font-bold text-lg'>
				{label}
			</label>
			<input
				type={type}
				name={name}
				className='block my-1 w-full p-2 text-lg border rounded'
				onChange={handleChange}
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
