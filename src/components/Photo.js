function Photo({data}) {
	return (
		<li key={data.id}>
			<img src={data.img_src} alt={data.id} className="w-1/4" />
		</li>
	);
}

export default Photo;
