import styled from 'styled-components';

const Hour = styled.div`
  font-family: ${props => props.theme.primaryFont};
  padding: 0.3rem 0.5rem 0.3rem 1.6875rem;
  width: 20.2vw;
  font-size: 0.875rem;
  color: ${props =>
    props.available ? props.theme.primaryText : props.theme.grey};
  text-align: right;
  position: relative;

  &::before {
    content: '';
    height: ${props =>
      props.availableFirstHalf || props.availableSecondHalf ? '50%' : '100%'};
    width: 1px;
    position: absolute;
    right: 0;
    ${props => (props.availableSecondHalf ? '' : 'top: 0;')} 
    ${props => (props.availableSecondHalf ? 'bottom: 0;' : '')}
      border-right: 2px solid ${props =>
        props.available || props.availableSecondHalf || props.availableFirstHalf
          ? '#DFF1D4'
          : '#d6d6d7'};
    }

  }

    &::after {
    content: '';
    height: ${props =>
      props.availableFirstHalf || props.availableSecondHalf ? '50%' : '100%'};
    width: 1px;
    position: absolute;
    right: 0;
    ${props => (props.availableSecondHalf ? 'top: 0;' : '')} 
    ${props => (props.availableFirstHalf ? 'bottom: 0;' : '')}
    ${props =>
      props.availableFirstHalf || props.availableSecondHalf
        ? 'border-right: 2px solid #d6d6d7;'
        : ''}

  }
`;

export default Hour;
