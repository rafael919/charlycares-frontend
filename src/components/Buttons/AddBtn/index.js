//@flow
import { Button } from 'semantic-ui-react';
import * as React from 'react';
import styled from 'styled-components';
import addBtnIcon from 'Assets/icons/add-btn.svg';

const StyledBtn = styled(Button)`
  &&& {
    background: transparent;
    font-size: 1rem;
    color: ${props => props.theme.secondaryColor};
    font-weight: normal;
    padding: ${props => props.padding && props.padding};
    display: flex;
    align-items: center;
    justify-content: flex-start;

`;

const Text = styled.span`
  margin-left: 0.5rem;
`;

const Icon = styled.img`
  width: 44px;
  height: 44px;
`;

const AddBtn = ({
  text,
  padding,
  children,
  ...rest
}: {
  text?: string | React.Node,
  padding?: string,
  children?: React.Node,
  rest?: Array<string>,
}) => (
  <StyledBtn {...rest} padding={padding}>
    <Icon src={addBtnIcon} />
    <Text>{text && text}</Text>
    {children}
  </StyledBtn>
);

export default AddBtn;
