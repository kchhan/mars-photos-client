function Header(props) {
	const { title, rover } = props;

	return (
		<header className='mx-auto p-4 w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white rounded-t-lg text-center'>
			<h1 className='text-7xl'>{title}</h1>
			<h2 className="text-xl">{rover}</h2>
		</header>
	);
}

export default Header;
