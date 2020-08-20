import styled from 'styled-components';

const LineDivider = styled.div`
  text-align: center;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 45%;
    height: 1px;
    background: #ccc;
    top: 50%;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`;

export default LineDivider;
