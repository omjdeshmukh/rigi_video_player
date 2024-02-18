import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoList from "../../components/videoList/VideoList";
import Dropdown from "../../components/dropdown/DropDown";
import { useAppContext } from "../../context/AppContext";
import { videos } from "../../assets/constant/data";

function Home(props) {
	const [selectedMyList, setSelectedMyList] = useState("");
	const [listVideos, setListVideos] = useState([]);
	const { myList } = useAppContext();

	useEffect(() => {
		const list = myList.find(
			(item) => Number(item._id) === Number(selectedMyList)
		);
		if (list) {
			const videoList = [];
			videos.map((x) => {
				if (list?.videoList?.find((y) => Number(y) === Number(x._id))) {
					return videoList.push(x);
				} else {
					return null;
				}
			});
			setListVideos(videoList);
		} else {
			setListVideos(videos);
		}
	}, [selectedMyList, myList]);

	return (
		<div id='main'>
			<Header>
				<HeaderTitle>Video Play List</HeaderTitle>
				<HeaderMenu>
					<MenuTitle onClick={() => setListVideos(videos)}>
						{" "}
						All Songs{" "}
					</MenuTitle>
					<Dropdown
						menu={myList}
						setSelectedMyList={setSelectedMyList}
						title='My List'
					/>
				</HeaderMenu>
			</Header>


			<MainContainer>
				<VideoList videos={listVideos} />
			</MainContainer>
		</div>
	);
}

export default Home;

const Header = styled.div`
	position: fixed;
	z-index: 10;
	width: 100%;
	height: 5rem;
	padding-inline: 3rem;

	background-color: #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderTitle = styled.div`
	font-weight: bold;
	font-size: 2rem;
	color: #e3fbff;
`;

const HeaderMenu = styled.div`
	display: flex;
	gap: 1rem;
`;
const MenuTitle = styled.button`
	font-weight: bold;
	font-size: 1rem;
	color: white;
	background: transparent;
	cursor: pointer;

	&:hover {
		color: #a3a3a3;
	}
`;

const MainContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 6rem;
	padding: 1rem;
`;

