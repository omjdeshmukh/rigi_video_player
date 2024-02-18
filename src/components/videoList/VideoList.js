import React from "react";
import styled from "styled-components";
import VideoCard from "../videoCard/VideoCard";
import { useNavigate } from "react-router-dom";

function VideoList({videos}) {

	const navigate = useNavigate();

	const onClickVideo = (_id) => {
		navigate(`/video/${_id}`);
	};

	return (
		<VideosStyled>
			<div className='videos-list-container'>
				{videos.map((video, index) => {
					return (
						<VideoCard
							title={video.subtitle}
							description={video.description}
							videoSrc={video.sources[0]}
							key={video._id}
							onClickVideo={() => onClickVideo(video._id)}
						/>
					);
				})}
			</div>
		</VideosStyled>
	);
}

const VideosStyled = styled.div`
	.videos-list-container {
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1em;
		transition: all 0.4s ease;
		opacity: 0;
		animation: fade-in 0.5s ease-in-out forwards;
		@keyframes fade-in {
			0% {
				opacity: 0;
				transform: scale(0);
			}
			100% {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
`;

export default VideoList;
