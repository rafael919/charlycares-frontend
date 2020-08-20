import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;
const ProgressBarPart = styled.div`
  width: 30px;
  height: 10px;
  background-color: ${props =>
    props.filled ? props.theme.secondaryColor : '#d8d8d8'};
  margin-right: 2px;
  border-radius: 1px;
`;
const ProgressBarPercent = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
  margin-left: 8px;
`;

const calculateFilledParts = percent => {
  const percentPerField = 16.7; // 100/6
  return Math.round(percent / percentPerField);
};

const renderFields = (filled, total) => {
  const parts = [];
  for (let i = 0; i < total; i++) {
    if (i < filled) {
      parts.push(<ProgressBarPart key={i} filled />);
    } else {
      parts.push(<ProgressBarPart key={i} />);
    }
  }
  return parts;
};

const TOTAL_NUMBER_OF_PARTS = 6;

const ProgressBar = ({ percent = 0, progress }) => (
  <Container>
    {renderFields(calculateFilledParts(percent), TOTAL_NUMBER_OF_PARTS)}
    {progress ? (
      <ProgressBarPercent>{`${progress.finished} of ${
        progress.total
      }`}</ProgressBarPercent>
    ) : (
      <ProgressBarPercent>{`${percent}%`}</ProgressBarPercent>
    )}
  </Container>
);

export default ProgressBar;
