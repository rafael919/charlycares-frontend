import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import notVisibleIcon from 'Assets/icons/icon-tabbar-view-hidden.svg';
import visibleIcon from 'Assets/icons/icon-tabbar-view.svg';

const Container = styled.div`
  margin-right: ${props => (props.hasError ? '1.5rem' : 0)};
`;

const VisibilityIcon = ({ visible, onIconClick, hasError }) => {
  return (
    <Container hasError={hasError} onClick={onIconClick}>
      {visible ? <Image src={notVisibleIcon} /> : <Image src={visibleIcon} />}
    </Container>
  );
};

export default VisibilityIcon;
