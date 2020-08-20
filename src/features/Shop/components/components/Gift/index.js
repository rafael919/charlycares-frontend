import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import { TimerLoader } from 'Components/Progressive';
import Divider from 'Components/Divider';

import ButtonContainer from '../components/ButtonContainer';

const Container = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 1rem;
  ${props => props.cursor && `cursor: ${props.cursor};`}
  ${props => props.opacity && `opacity: ${props.opacity};`}

  ${({ theme }) =>
    !isMobile &&
    `
    background:  #fff;
    border: 1px solid ${theme.defaultGrey};
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
    border-bottom: 0;
  `}
  ${({ bottomBorder }) =>
    bottomBorder &&
    `
    border: 0px;
    border-radius : 0;
    border-bottom: 1px solid lightGrey;
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

const ImageContainer = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 9.8rem;
  height: 6.7rem;
  margin-right: 0.625rem;
  border: 1px solid ${props => props.theme.defaultGrey};
`;

const GiftTitleContainer = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.lightGrey};
  text-align: left;
`;

const GiftSubTitleContainer = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 500;
  font-size: 1rem;
`;

const GiftDescContainer = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
  text-align: left;
`;

const LineDivider = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
const Line = styled.div`
  border-bottom: 1px solid lightGrey;
`;

class Gift extends React.Component {
  onSelectItem = id => {
    const { onItemSelect } = this.props;
    onItemSelect && onItemSelect(id);
  };

  render() {
    const {
      showType,
      availablePoints,
      gift,
      border,
      divider,
      bottomBorder,
      onPressBtn,
    } = this.props;

    return (
      <React.Fragment>
        <Divider />
        <Container
          onClick={() => {
            showType === 'all' &&
              gift.type === 'purchased' &&
              this.onSelectItem(gift.id);
          }}
          divider={divider}
          border={border}
          bottomBorder={bottomBorder}
          cursor={
            showType === 'all'
              ? gift.type === 'purchased'
                ? 'pointer'
                : 'default'
              : 'default'
          }
          opacity={
            showType === 'all' ? (gift.type === 'purchased' ? 0.6 : 1.0) : 1.0
          }
        >
          <ImageContainer>
            <div>
              <Image src={gift.image} />
            </div>
            <div>
              <GiftTitleContainer>{gift.titleDisplay}</GiftTitleContainer>
              <GiftSubTitleContainer>{gift.subtitle}</GiftSubTitleContainer>
              <GiftDescContainer>{gift.description}</GiftDescContainer>
            </div>
          </ImageContainer>
        </Container>
        <LineDivider>
          <Line />
        </LineDivider>
        {showType !== 'detail' && (
          <ButtonContainer
            availablePoints={availablePoints}
            showType={showType}
            gift={gift}
            onPressBtn={onPressBtn}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Gift;
