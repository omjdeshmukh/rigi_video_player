import React, { useEffect, useRef, useState, } from "react";
import styled from "styled-components";
import screenfull from "screenfull";
import { useParams } from "react-router-dom";
import { videos } from "../../assets/constant/data";

const VideoPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [selectedTimeLinePercent, setSelectedTimeLinePercent] = useState(0)
    const [currentTimeline, setCurrentTimeline] = useState(0)
	const [selectedTime, setSelectedTime] = useState(0)


	const {id} = useParams()
	const video = videos.find((vid)=> {
		return Number(vid._id) === Number(id)
    }).sources[0]
	
	const videoRef = useRef(null);
	const timelineRef = useRef(null);
	
	const TimeLineIndicator = styled.div`
	height: 7px;
	margin-inline: 0.5rem;
	cursor: pointer;
	display: flex;
	align-items: center;

	.timeline {
		background-color: rgba(100, 100, 100, 0.5);
		height: 3px;
		width: 100%;
		position: relative;
	}

	.timeline::after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: calc(100% - ${selectedTimeLinePercent} * 100%);
		background-color: red;
	}

	.timeline .thumb-indicator {
		--scale: 0;
		position: absolute;
		transform: translateX(-50%) scale(var(--scale));
		height: 200%;
		top: -50%;
		left: calc(${selectedTimeLinePercent} * 100%);
		background-color: red;
		border-radius: 50%;
		transition: transform 150ms ease-in-out;
		aspect-ratio: 1 / 1;
	}
`;


	const onCLickSelectedTime = () => {
		videoRef.current.currentTime = selectedTime;
		setSelectedTimeLinePercent(currentTimeline)
	}


	const togglePlay = () => {
		setIsPlaying((prevState) => !prevState);
		if (videoRef.current.paused) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	};

	const toggleFullScreen = () => {
		if (!videoRef.current) return;
		const element = videoRef.current;
		if (screenfull.isEnabled) {
			if (!screenfull.isFullscreen) {
				screenfull.request(element);
			} else {
				screenfull.exit();
			}
		} else {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else {
				console.error("Fullscreen not supported by this browser.");
			}
		}
		setIsFullScreen(!isFullScreen);
	};

	const handleVolumeChange = (event) => {
		const volume = parseFloat(event.target.value);
		videoRef.current.volume = volume;
	};

	const handleTimelineUpdate = (e) => {
		const rect = timelineRef.current?.getBoundingClientRect();
		const percent = (e.clientX - rect.left) / rect.width;
		const newTime = percent * videoRef.current.duration;
        setCurrentTimeline(percent)
		setSelectedTime(newTime);
	};

	const changePlaybackSpeed = () => {
		const speeds = [0.5, 1, 1.5, 2];
		const currentIndex = speeds.indexOf(playbackSpeed);
		const newIndex = (currentIndex + 1) % speeds.length;
		setPlaybackSpeed(speeds[newIndex]);
		videoRef.current.playbackRate = speeds[newIndex];
	};

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			setDuration(videoRef.current.duration);
			const handleTimeUpdate = () => {
				const percent = video.currentTime / video.duration
				setCurrentTime(video.currentTime);
				setSelectedTimeLinePercent(percent)
			};
			video.addEventListener("timeupdate", handleTimeUpdate);
			return () => {
				video.removeEventListener("timeupdate", handleTimeUpdate);
			};
		}
	}, [videoRef]);

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (
				event.key === " " &&
				document.activeElement.tagName.toLowerCase() !== "input"
			) {
				event.preventDefault();
				togglePlay();
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	function formatDuration(duration) {
		if (isNaN(duration)) return "0:00";

		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor((duration % 3600) / 60);
		const seconds = Math.floor(duration % 60);

		return `${hours > 0 ? hours + ":" : ""}${String(minutes).padStart(
			2,
			"0"
		)}:${String(seconds).padStart(2, "0")}`;
	}

	return (
		<VideoPlayerStyled>
			<div className='video-container paused' data-volume-level='high'>
				<img
					className='thumbnail-img'
					alt=''
					src='https://picsum.photos/200/300'
				/>
				<div className='video-controls-container'>
				<TimeLineIndicator
						ref={timelineRef}
						onMouseMove={handleTimelineUpdate}
					>
						<div className='timeline' onClick={onCLickSelectedTime} >
							<div className='thumb-indicator' ></div>
						</div>
					</TimeLineIndicator>
					<div className='controls'>
						<button
							className='play-pause-btn'
							onClick={() => {
								togglePlay();
							}}
						>
							{!isPlaying ? (
								<svg viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M8,5.14V19.14L19,12.14L8,5.14Z'
									/>
								</svg>
							) : (
								<svg viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M14,19H18V5H14M6,19H10V5H6V19Z'
									/>
								</svg>
							)}
						</button>
						<div className='volume-container'>
							<button className='mute-btn'>
								<svg className='volume-high-icon' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z'
									/>
								</svg>
								<svg className='volume-low-icon' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z'
									/>
								</svg>
								<svg className='volume-muted-icon' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z'
									/>
								</svg>
							</button>
							<input
								className='volume-slider'
								type='range'
								min='0'
								max='1'
								step='0.01'
								defaultValue='1'
								onChange={handleVolumeChange}
							/>
						</div>
						<div className='duration-container'>
							<div className='current-time'>
								<span>{formatDuration(currentTime)}</span>/
								<span>{formatDuration(duration)}</span>
							</div>
						</div>

						<div className='playback-container'>
							<button
								className='speed-btn wide-btn'
								onClick={changePlaybackSpeed}
							>
								{playbackSpeed}
							</button>
						</div>

						<button className='full-screen-btn' onClick={toggleFullScreen}>
							{isFullScreen ? (
								<svg viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z'
									/>
								</svg>
							) : (
								<svg viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
				<video
					ref={videoRef}
					src={video}
					id={video} preload="none"
				></video>
			</div>
		</VideoPlayerStyled>
	);
};

export default VideoPlayer;

const VideoPlayerStyled = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: black;

	.video-container {
		position: relative;
		width: 90%;
		max-width: 1000px;
		display: flex;
		justify-content: center;
		margin-inline: auto;
		background-color: black;
	}

	.video-container.theater,
	.video-container.full-screen {
		max-width: initial;
		width: 100%;
	}

	.video-container.theater {
		max-height: 90vh;
	}

	.video-container.full-screen {
		max-height: 100vh;
	}

	video {
		width: 100%;
	}

	.video-controls-container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color: white;
		z-index: 100;
		opacity: 0;
		transition: opacity 150ms ease-in-out;
	}

	.video-controls-container::before {
		content: "";
		position: absolute;
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
		width: 100%;
		aspect-ratio: 6 / 1;
		z-index: -1;
		pointer-events: none;
	}

	.video-container:hover .video-controls-container,
	.video-container:focus-within .video-controls-container,
	.video-container.paused .video-controls-container {
		opacity: 1;
	}

	.video-controls-container .controls {
		display: flex;
		gap: 0.5rem;
		padding: 0.25rem;
		align-items: center;
	}

	.video-controls-container .controls button {
		background: none;
		border: none;
		color: inherit;
		padding: 0;
		height: 30px;
		width: 30px;
		font-size: 1.1rem;
		cursor: pointer;
		opacity: 0.85;
		transition: opacity 150ms ease-in-out;
	}

	.video-controls-container .controls button:hover {
		opacity: 1;
	}

	.video-container.theater .tall {
		display: none;
	}

	.video-container:not(.theater) .wide {
		display: none;
	}

	.volume-high-icon,
	.volume-low-icon,
	.volume-muted-icon {
		display: none;
	}

	.video-container[data-volume-level="high"] .volume-high-icon {
		display: block;
	}

	.video-container[data-volume-level="low"] .volume-low-icon {
		display: block;
	}

	.video-container[data-volume-level="muted"] .volume-muted-icon {
		display: block;
	}

	.volume-container {
		display: flex;
		align-items: center;
	}

	.volume-slider {
		width: 0;
		transform-origin: left;
		transform: scaleX(0);
		transition: width 150ms ease-in-out, transform 150ms ease-in-out;
	}

	.volume-container:hover .volume-slider,
	.volume-slider:focus-within {
		width: 100px;
		transform: scaleX(1);
	}

	.duration-container {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-grow: 1;
	}

	.video-container.captions .captions-btn {
		border-bottom: 3px solid red;
	}

	.video-controls-container .controls button.wide-btn {
		width: 50px;
	}

	.timeline-container {
		height: 7px;
		margin-inline: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.timeline {
		background-color: rgba(100, 100, 100, 0.5);
		height: 3px;
		width: 100%;
		position: relative;
	}

	.timeline::after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: calc(100% - ${0.50} * 100%);
		background-color: red;
	}
	
	.thumbnail-img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: none;
	}

	.video-container.scrubbing .thumbnail-img {
		display: block;
	}

	.video-container.scrubbing .preview-img,
	.timeline-container:hover .preview-img {
		display: block;
	}

	.video-container.scrubbing .timeline::before,
	.timeline-container:hover .timeline::before {
		display: block;
	}

	.video-container.scrubbing .thumb-indicator,
	.timeline-container:hover .thumb-indicator {
		--scale: 1;
	}

	.video-container.scrubbing .timeline,
	.timeline-container:hover .timeline {
		height: 100%;
	}
`;
