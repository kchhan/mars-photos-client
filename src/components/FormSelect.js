function FormSelect(props) {
	const { label, name, error } = props;
	const options = JSON.parse(props.options);

	const handleChange = (e) => {
		props.onSelectUpdate(e.target.value);
	};

	return (
		<div className='m-2'>
			<label className='block my-1 w-full font-bold text-lg'>
				{label}
			</label>
			<select
				name={name}
				className='block my-1 w-full p-2 text-lg rounded'
				onChange={handleChange}
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
