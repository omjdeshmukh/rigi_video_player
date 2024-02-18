import React, { Fragment, useState } from "react";
import styled from "styled-components";
import CreateListModal from "../createListModal/CreateListModal";

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
`;

const DropdownButton = styled.button`
	font-weight: bold;
	font-size: 1rem;
	color: white;
	background: transparent;
	cursor: pointer;

	&:hover {
		color: #a3a3a3;
	}
`;

const DropdownContent = styled.div`
	position: absolute;
	background-color: #f9f9f9;
	min-width: 180px;
	z-index: 1;
`;

const DropdownItem = styled.a`
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	cursor: pointer;

	&:hover {
		background-color: #f1f1f1;
	}
`;

const Divider = styled.div`
	border: 1px solid gray;
	width: 100%;
`;

const Dropdown = ({ title, menu, setSelectedMyList }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [openCreateListModal, setOpenCreateListModal] = useState(false);

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	const onClickAddList = () => {
		setOpenCreateListModal(true);
		setIsOpen(false);
	};

	const onCLickClose = () => {
		setOpenCreateListModal(false);
	};

	return (
		<Fragment>
			<DropdownContainer>
				<DropdownButton
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{title}
				</DropdownButton>
				{isOpen && (
					<DropdownContent
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<DropdownItem href='#' onClick={onClickAddList}>
							Add List
						</DropdownItem>
						<Divider />
						{menu.map((x) => (
							<DropdownItem
								key={x._id}
								onClick={() => {
									setSelectedMyList(x._id);
								}}
							>
								{x.listName}
							</DropdownItem>
						))}
					</DropdownContent>
				)}
			</DropdownContainer>
			{openCreateListModal ? <CreateListModal close={onCLickClose} /> : null}
		</Fragment>
	);
};

export default Dropdown;
