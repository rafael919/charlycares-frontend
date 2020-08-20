import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import curry from 'ramda/es/curry';
import memoizeWith from 'ramda/es/memoizeWith';

import styled from 'styled-components';
import arrowRight from 'Assets/icons/btn-large-arrow-right.svg';

const Container = styled.ul`
  padding: 0 ${isMobile ? '1rem' : '0'};
  margin: 0;
  width: 100%;

  & > li:last-child:after {
    display: none;
  }
`;

const Content = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem ${isMobile ? '0' : '1rem'};
  cursor: pointer;
  ${isMobile && `border-bottom: 1px solid lightGrey;`}
  
  ${({ bottomBorder }) =>
    bottomBorder &&
    `
  border: 0px;
  border-radius : 0;
  border-bottom: 0px solid lightGrey;
`}
${({ theme }) =>
  !isMobile &&
  `
  background:  #fff;
  border: 1px solid ${theme.defaultGrey};
  border-radius: 0.3125rem;
  margin-bottom: 0.3125rem;
`}

 ${props =>
   props.border && `border-bottom: 1px solid ${props.theme.defaultGrey};`}
${props =>
  props.divider && props.withButton && isMobile
    ? `
  &:after {
      content: "";
      position: absolute;
      margin-bottom: 0.3125rem;
      width: calc(100% + 58px);
      bottom: 0;
      left: 0;
      background: #f9f8f9;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
  }
  `
    : props.divider && isMobile
    ? `
  &:after {
      content: "";
      position: absolute;
      margin-bottom: 0.3125rem;
      width: 100%;
      bottom: 0;
      left: 0;
      background: #f9f8f9;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
  }
  `
    : null};
`;

const MenuTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.975rem;
  font-weight: 400;
  color: ${props =>
    props.warning ? props.theme.warning : props.theme.lightGrey};
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.975rem;
  font-weight: 400;
  margin-right: 1.3rem;
  color: ${props =>
    props.warning ? props.theme.warning : props.theme.lightGrey};
`;

const ArrowRightContainer = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  right: ${isMobile ? '-0.5rem' : '0'};
  top: 0;
  width: ${props => (props.image ? '50%' : '100%')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: ${props => (isMobile ? `-0.3rem` : `0.3rem`)};

  &:focus {
    outline: 0;
  }
`;

const onMenuSelect = memoizeWith(
  id => id,
  curry((id, history, _e) => {
    var path =
      id === 1 ? '/shop/help' : id === 2 ? '/shop/purchases' : '/shop/history';
    history.push(path, { from: 'shop' });
  })
);

const Menu = ({
  purchaseCount,
  history,
  withButton,
  border,
  divider,
  bottomBorder,
}) => {
  return (
    <Container>
      <Content
        onClick={onMenuSelect(1, history)}
        divider={divider}
        border={border}
        bottomBorder={bottomBorder}
      >
        <MenuTitleContainer>
          <FormattedMessage id="shop.menu.getPoint" />
        </MenuTitleContainer>
        <ArrowRightContainer>
          <Image src={arrowRight} />
        </ArrowRightContainer>
      </Content>

      <Content
        onClick={onMenuSelect(2, history)}
        divider={divider}
        border={border}
        bottomBorder={bottomBorder}
      >
        <MenuTitleContainer>
          <FormattedMessage id="shop.menu.purchases" />
        </MenuTitleContainer>
        <BadgeContainer>{purchaseCount}</BadgeContainer>
        <ArrowRightContainer>
          <Image src={arrowRight} />
        </ArrowRightContainer>
      </Content>

      <Content
        onClick={onMenuSelect(3, history)}
        divider={divider}
        border={border}
        bottomBorder={true}
      >
        <MenuTitleContainer>
          <FormattedMessage id="shop.menu.history" />
        </MenuTitleContainer>
        <ArrowRightContainer>
          <Image src={arrowRight} />
        </ArrowRightContainer>
      </Content>
    </Container>
  );
};

export default Menu;
