import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MultiSelect from "../multiSelect/MultiSelect";
import { videos } from "../../assets/constant/data";
import { useAppContext } from "../../context/AppContext";

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: block;
`;

const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	width: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	display: block;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const FormInput = styled.input`
	margin-bottom: 1rem;
	padding: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1rem;
`;

const FormButton = styled.button`
	padding: 10px 20px;
	background-color: #3498db;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const ModalTitle = styled.h6`
	font-size: 1.25rem;
	font-weight: bold;
	margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: end;
	gap: 0.5rem;
`;

const CreateListModal = ({ close }) => {
	const { myList, setMyList } = useAppContext();

	const [formData, setFormData] = useState({
		listName: "",
		videoList: "",
	});

  function generateRandomId() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!formData.listName) {
			alert("List name please");
			return;
		}
		if (formData.videoList?.length <= 0) {
			alert("At least one item select");
			return;
		}

    const randomId = generateRandomId();

		setMyList([...myList, {...formData,_id:randomId}]);

		setFormData({
      _id:'',
			listName: "",
			videoList: "",
		});
    close()
	};

	return (
		<div>
			<ModalOverlay onClick={close}></ModalOverlay>
			<ModalContainer>
				<ModalTitle>New List</ModalTitle>
				<Form onSubmit={handleSubmit}>
					<FormInput
						onChange={(e) =>
							setFormData((state) => ({ ...state, listName: e.target.value }))
						}
						type='text'
						placeholder='List Name'
					/>

					<MultiSelect selectedList={setFormData} options={videos} />
					<ButtonContainer>
						<FormButton type='submit'>Create</FormButton>
						<FormButton onClick={close}>Cancel</FormButton>
					</ButtonContainer>
				</Form>
			</ModalContainer>
		</div>
	);
};

export default CreateListModal;
