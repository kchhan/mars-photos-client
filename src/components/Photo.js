function Photo({data}) {
	return (
		<li className="m-auto w-3/4">
			<img src={data.img_src} alt={data.id} className="m-auto w-full" />
		</li>
	);
}

export default Photo;
