function Footer() {
	return (
		<footer className='flex items-center justify-center sticky inset-x-0 bottom-0'>
			<p className='text-gray-400'>Developed by kchhan</p>
			<a
				href='https://github.com/kchhan/mars-photos-client'
				target='_blank'
				rel='noreferrer'
				className='mx-3 text-gray-400'
			>
				<i className='fab fa-github-square fa-3x'></i>
			</a>
			<a
				href='https://api.nasa.gov/'
				target='_blank'
				rel='noreferrer'
				className='text-gray-400 underline'
			>
				Mars Rover API by NASA
			</a>
		</footer>
	);
}

export default Footer;
