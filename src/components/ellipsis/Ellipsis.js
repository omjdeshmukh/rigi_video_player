import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
`;

const Text = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ expanded }) => expanded && 'white-space: normal;'}
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
`;

const EllipsisText = ({ text, maxLength }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Text expanded={expanded}>
        {text.length > maxLength && !expanded ? text.slice(0, maxLength) : text}
      </Text>
      {text.length > maxLength && (
        <ShowMoreButton onClick={toggleExpansion}>
          {expanded ? 'Show less' : 'Show more'}
        </ShowMoreButton>
      )}
    </Container>
  );
};

export default EllipsisText;
