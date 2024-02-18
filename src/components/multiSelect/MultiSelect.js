import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EllipsisText from "../ellipsis/Ellipsis";
import { videos } from "../../assets/constant/data";

const Container = styled.div`
	display: inline-block;
`;

const SelectContainer = styled.div`
	position: relative;
	display: inline-block;
	margin-right: 10px;
	width: 100%;
`;

const Select = styled.select`
	padding: 16px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	appearance: none;
	margin-bottom: 1rem;
	width: 100%;
`;

const Option = styled.option`
	color: #fff;
`;

const OptionLabel = styled.option`
	display: block;
	margin-bottom: 5px;
`;

const SelectedOptionContainer = styled.div`
	display: flex;
    flex-wrap: wrap;
    overflow-x: scroll;
    overflow-y: hidden;
`;

const CardContainer = styled.div`
	width: 180px;
	overflow: hidden;
	margin: 10px;
	position: relative;
	&:hover {
		background-color: #ababab;
		opacity: 0.7;
	}
`;

const RemoveButton = styled.button`
	position: absolute;
	z-index: 10;
	color: red;
	background-color: transparent;
	font-size: 1rem;
	padding: 0.5rem;
	cursor: pointer;
	font-weight: bold;
	top: 0;
	right: 0;
`;

const VideoPlayer = styled.video`
	max-width: 100%;
	height: auto;
`;

const MultiSelect = ({ options, selectedList }) => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleSelect = (event) => {
		const selectedValue = event.target.value;
		if (!selectedOptions.includes(selectedValue)) {
			setSelectedOptions([...selectedOptions, selectedValue]);
		}
	};

	const handleRemove = (option) => {
		setSelectedOptions(selectedOptions.filter((item) => item !== option));
	};

	useEffect(() => {
		selectedList( state=>  ({...state, videoList: selectedOptions}));
		// eslint-disable-next-line
	}, [selectedOptions]);

	return (
		<Container>
			<SelectedOptionContainer>
				{selectedOptions.map((option) => {
					let temp = videos.find((v) => v?._id === Number(option));
					return (
						<CardContainer key={temp._id} >
							<VideoPlayer>
								<source src={temp.sources[0]} type='video/mp4' />
								Your browser does not support the video tag.
							</VideoPlayer>
							<RemoveButton type='button' onClick={() => handleRemove(option)}>
								&#10005;
							</RemoveButton>
						</CardContainer>
					);
				})}
			</SelectedOptionContainer>

			<SelectContainer>
				<Select onChange={handleSelect}>
					<OptionLabel>Select an option</OptionLabel>
					{options.map((option) => (
						<Option key={option._id} value={option._id}>
							<EllipsisText maxLength={20} text={option.description} />
						</Option>
					))}
				</Select>
			</SelectContainer>
		</Container>
	);
};

export default MultiSelect;
