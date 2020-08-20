import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import warningIcon from '../../assets/icons/warning.svg';

const CInput = ({ hasError, refKey, ...rest }) => {
  return <Input ref={refKey} {...rest} />;
};

const CustomInput = styled(CInput)`
  position: relative;
  border: 0 !important;
  border-bottom: 1px solid
    ${props => (props.hasError ? props.theme.errorColor : '#ccc')} !important;
  padding: ${props =>
    props.padding ? props.padding : '0.4rem 0.2rem !important'};
  font-size: 1.1rem !important;
  caret-color: #000;
  ${props => {
    if (props.hasError) {
      return ` &:after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%); 
        right: 0;
        width: 20px;
        height: 20px;
        background: url(${warningIcon}) center center;
      }`;
    }
  }};
`;

export default CustomInput;
