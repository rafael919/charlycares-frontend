import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const Container = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1rem;
  ${props => props.opacity && `opacity: 0.4;`}

  ${({ theme }) =>
    !isMobile &&
    `
    background:  #fff;    
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
    }
    `
      : null};
`;

const TitleContainer = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  font-size: 1rem;
`;

const PointContainer = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  color: ${props => props.theme.lightGrey};
  font-size: 1.1rem;
  white-space: nowrap;
`;

const DescContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0rem 1rem 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
  text-align: left;
  ${props => !isMobile && !props.last && `border-bottom: 1px solid lightGrey;`}
`;

const LineDivider = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
const Line = styled.div`
  border-bottom: 1px solid lightGrey;
`;

class EarnPointHelp extends React.Component {
  onSelectItem = itemId => {
    const { onItemSelect } = this.props;
    onItemSelect && onItemSelect(itemId);
  };

  render() {
    const { item, border, divider, last } = this.props;

    return (
      <React.Fragment>
        <Container divider={divider} border={border} bottomBorder={true}>
          <TitleContainer>
            <FormattedMessage id={item.title} />
          </TitleContainer>
          <PointContainer>
            + {item.points} <FormattedMessage id="shop.points.txt" />
          </PointContainer>
        </Container>
        <DescContainer last={last}>
          <FormattedMessage id={item.desc} />
        </DescContainer>
        {isMobile && !last && (
          <LineDivider>
            <Line />
          </LineDivider>
        )}
      </React.Fragment>
    );
  }
}

export default EarnPointHelp;
