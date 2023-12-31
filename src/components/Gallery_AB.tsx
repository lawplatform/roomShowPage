interface Gallery_ButtonProps {
	show: (id: string) => void;
	img: string;
	name: string;
}
const Gallery_AB = ({ name, img, show }: Gallery_ButtonProps) => {
	const handleDivClick = () => {
		show(name)
	}
	return (
		<div className="mx-2 mt-5 card w-45 bg-slate-50" onClick={handleDivClick}>
			<img className="rounded-lg bg-cover h-[90px]" src={img} alt="" />
			<div className="flex flex-row justify-center mt-2">
				<div>
					<p className="text-sm text-gray-800 text-center font-bold mb-2">{name}</p>
				</div>
				<div className="flex flex-row items-center">
				</div>
			</div>
		</div>

	)

}


export default Gallery_AB;
