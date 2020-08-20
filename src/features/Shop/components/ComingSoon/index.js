import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import Divider from 'Components/Divider';
import GiftImage from 'Assets/images/gift-coming-soon.svg';
import { FormattedMessage } from 'react-intl';

const OuterContainer = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;

  & > li:last-child:after {
    display: none;
  }
`;

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


class ComingSoon extends React.Component {
    render () {
        const {
            border,
            divider,
            bottomBorder,
        } = this.props;
        return (
        <OuterContainer>
            <Divider />
            <Container
                divider={divider}
                border={border}
                bottomBorder={bottomBorder}
            >
            <ImageContainer>
                <div>
                <Image src={GiftImage} />
                </div>
                <div>
                <GiftSubTitleContainer><FormattedMessage id="shop.comingSoonTitle" /></GiftSubTitleContainer>
                <GiftDescContainer><FormattedMessage id="shop.comingSoonDesc" /></GiftDescContainer>
                </div>
            </ImageContainer>
            </Container>
            <LineDivider>
                <Line />
            </LineDivider>
        </OuterContainer>
    )};
};

export default ComingSoon;
