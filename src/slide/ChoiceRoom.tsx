import { useState } from "react";
import Searchbar from "../components/SearchBar";
import Gallery_Button from "../components/Gallery_Button";
import Icon_label from "../components/Icon_label";
import { useQuery } from "@tanstack/react-query";
import { observer } from "@legendapp/state/react";
import { State } from "../store/State"
import Gallery_AB from "../components/Gallery_AB";
interface ChoiceRoomProp {
	platform: string;
	next: () => void;
	prev: () => void;
	change: (Name: string, Link: string) => void;
}

const ChoiceRoom = observer(function component({ platform, next, prev, change }: ChoiceRoomProp) {

	const metaverse = State.Metaverse.get();
	const imagePath = "/room/" + metaverse + "/"
	const [filterOptions, setFilterOptions] = useState(["sns", "home", "talk", "edu"]);
	const [search, setSearch] = useState("");

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		if (checked) {
			setFilterOptions((prevOptions) => [...prevOptions, value]);
		} else {
			setFilterOptions((prevOptions) =>
				prevOptions.filter((option) => option !== value)
			);
		}
	};

	const { data, isLoading, error } = useQuery(['jsonData', { filter: { metaverse } }], () =>
		fetch(`/room/${metaverse}.json`)
			.then((response) => response.json()));


	const applyFilters = () => {

		if (!data || !Array.isArray(data)) {
			return [];
		}
		const filteredData = data.filter((item: any) =>
			item.category.some((cat: string) => filterOptions.includes(cat))
			&&
			(search.trim() === "" || item.name.toLowerCase().includes(search.toLowerCase()))
		);

		return filteredData;
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}
	if (!data) {
		return <div>Item not found!</div>;
	}
	const filteredData = applyFilters();

	const showModal = (name: string) => {
		let choiceItem = filteredData.find(item => item.name === name);
		State.Room.set(choiceItem.name);
		State.Link.set(choiceItem.link);
		State.imgName.set(choiceItem.imgName);
		window.my_modal.showModal()

	}
	const cilckHandler = () => {
		next();

	}
	return (
		<div className="h-full">
			<div className="form-control flex flex-row justify-center">
				<Icon_label icon="home" name="모임" handleChange={handleCheckboxChange} checked={filterOptions.includes("home")} />
				<Icon_label icon="edu" name="교육" handleChange={handleCheckboxChange} checked={filterOptions.includes("edu")} />
				<Icon_label icon="sns" name="홍보" handleChange={handleCheckboxChange} checked={filterOptions.includes("sns")} />
				<Icon_label icon="talk" name="상담" handleChange={handleCheckboxChange} checked={filterOptions.includes("talk")} />
			</div>

			<div className="mx-auto flex justify-center w-80 mt-3  mb-3">
				<Searchbar search={search} setSearch={setSearch} />

			</div>
			<div className="h-[1080px] overflow-y-scroll ">
				<div className="  flex items-center justify-center ">
					<div className="grid grid-cols-4 md:grid-cols-5 grid-flow-row gap-2 mt-5 px-1">
						{filteredData.map((item: any, index: number) => (
							<div className="w-40 h-30 sm:h-50">
								<Gallery_AB name={item.name} key={index} img={imagePath + item.imgName + '.png'} show={showModal} />
							</div>
						))}
					</div>
				</div>
			</div>
			< dialog id="my_modal" className="modal" >
				<form method="dialog" className="modal-box">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
					<h3 className="font-bold text-lg">{State.Room.get()}</h3>
					<img src={imagePath + State.imgName.get() + '.png'} className="rounded-xl" />
					{State.Link.get() !== "null" ? (
						<a className="btn btn-neutral mt-3" target="_blank" href={State.Link.get()}>
							<img src="/icon/see_white.svg" className="w-5" />
							구경하기
						</a>
					) : (<p>전문가와 상담하여 멋진 공간을 만들어보세요</p>)}
					<div className="flex flex-row justify-between">
						<div>
							{State.Link.get() !== "null" ?
								<p> 다양한 공간들을 둘러보세요</p> : <p></p>}
							<div className="relative ">
								<button className="btn btn-neutral" onClick={cilckHandler} >
									선택
								</button>
							</div>
						</div>
					</div>
				</form>
			</dialog >
		</div >
	)
});
export default ChoiceRoom;
