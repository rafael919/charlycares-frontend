import styled from 'styled-components';

const Container = styled.div`
  padding: 1.25rem 1rem;
  width: 100%;
  position: relative;

  ${props =>
    props.border &&
    `&::after {
    content: '';
    position: absolute;
    left: 1rem;
    bottom: 0;
    height: 1px;
    width: calc(100% - 2rem);
    background-color: ${props.theme.defaultGrey};
  }`};
`;

export default Container;
