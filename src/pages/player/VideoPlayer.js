import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { videos } from "../../assets/constant/data";

const VideoContainer = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #b1b1b1;
	display: flex;
	justify-content: center;
	align-items: center;
	object-fit: contain;
	position: relative;
`;

const Video = styled.video`
	width: 80%;
`;

const Controls = styled.div`
	position: absolute;
	bottom: 4rem;
	left: 10%;
	right:10%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
`;

const ControlButton = styled.button`
	background: none;
	border: none;
	color: white;
	cursor: pointer;
`;

const PlaybackSpeedSelector = styled.select`
	color: white;
	background: none;
	border: none;
	cursor: pointer;
`;

const FullScreenButton = styled.button`
	background: none;
	border: none;
	color: white;
	cursor: pointer;
`;

const VideoPlayer = ({ src }) => {
	const { id } = useParams();
	const videoUrl = videos.find((vid) => {
		return Number(vid._id) === Number(id);
	}).sources[0];
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === " ") {
				togglePlay();
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	const togglePlay = () => {
		const video = videoRef.current;
		setIsPlaying(!isPlaying);
		if (isPlaying) {
			video.pause();
		} else {
			video.play();
		}
	};

	const skip = (amount) => {
		const video = videoRef.current;
		video.currentTime += amount;
	};

	const handlePlaybackSpeedChange = (event) => {
		const speed = parseFloat(event.target.value);
		setPlaybackSpeed(speed);
		const video = videoRef.current;
		video.playbackRate = speed;
	};

	const toggleFullScreen = () => {
		const video = videoRef.current;
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			video.requestFullscreen();
		}
	};

	return (
		<VideoContainer>
			<Video ref={videoRef} src={videoUrl} playbackRate={playbackSpeed} />
			<Controls>
				<ControlButton onClick={() => skip(-10)}>« 10s</ControlButton>
				<ControlButton onClick={togglePlay}>
					{isPlaying ? "Pause" : "Play"}
				</ControlButton>
				<ControlButton onClick={() => skip(10)}>10s »</ControlButton>
				<PlaybackSpeedSelector
					value={playbackSpeed}
					onChange={handlePlaybackSpeedChange}
				>
					<option value={0.5}>0.5x</option>
					<option value={1}>1x</option>
					<option value={1.5}>1.5x</option>
					<option value={2}>2x</option>
				</PlaybackSpeedSelector>
				<FullScreenButton onClick={toggleFullScreen}>
					Full Screen
				</FullScreenButton>
			</Controls>
		</VideoContainer>
	);
};

export default VideoPlayer;
