import styled from 'styled-components';

const Container = styled.div`
  &&& {
    padding-bottom: ${({ noPaddingBottom }) => noPaddingBottom && 0} !important;
    padding-top: ${({ noPaddingTop }) => noPaddingTop && 0} !important;
  }
`;

export default Container;
