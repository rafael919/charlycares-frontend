import styled from 'styled-components';

const HourRow = styled.div`
  background: ${props =>
    props.available
      ? '#fff'
      : props.availableFirstHalf
        ? `linear-gradient(to bottom, #fff 0%, #fff 50%, #f0f0f0 50%)`
        : props.availableSecondHalf
          ? `linear-gradient(to bottom, #f0f0f0 0%, #f0f0f0 50%, #fff 50%)`
          : '#f0f0f0'};
  width: 100%;

  &:first-child {
    margin-top: 0.5rem;
  }
`;

export default HourRow;
