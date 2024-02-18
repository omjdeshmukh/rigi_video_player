import React from 'react';
import styled from 'styled-components';
import Ellipsis from '../ellipsis/Ellipsis';

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

// VideoCard component
const VideoCard = ({ videoSrc, title, description,onClickVideo }) => {
  return (
    <CardContainer>
      <VideoPlayer onClick={onClickVideo} >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoPlayer>
      <CardContent>
        <Title>{title}</Title>
        <Ellipsis text={description} maxLength={50} />
      </CardContent>
    </CardContainer>
  );
};

export default VideoCard;
