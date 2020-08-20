import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1rem;
  ${props => props.opacity && `opacity: 0.4;`}
  ${isMobile && `border-bottom: 1px solid lightGrey;`}

  ${({ theme }) =>
    !isMobile &&
    `
    background:  #fff;
    border: 1px solid ${theme.defaultGrey};
    border-radius: 0.3125rem;
    margin-bottom: 0.3125rem;
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

const TitleContainer = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 400;
  font-size: 1rem;
  padding-right: 0.5rem;
`;

const DescContainer = styled.div`
  padding-top: 0.8rem;
  font-family: ${props => props.theme.primaryFont};
  font-size: 0.875rem;
  color: ${props => props.theme.lightGrey};
`;

const PointContainer = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  text-align: left;
  color ${props => props.type === 'outcome' ? props.theme.secondaryColor : null};
  font-family: ${props => props.theme.secondaryFont};
`;

class HistoryItem extends React.Component {
  state = {};

  render() {
    const { border, divider, bottomBorder, historyItem } = this.props;

    return (
      <Container divider={divider} border={border} bottomBorder={bottomBorder}>
        <div>
          <TitleContainer>{historyItem.gift_id ? historyItem.gift.title : historyItem.type}</TitleContainer>
          <DescContainer>
            {historyItem.created_at
              ? moment(historyItem.created_at).format('MMMM DD, YYYY')
              : moment(new Date()).format('MMMM DD, YYYY')}
          </DescContainer>
        </div>
        <PointContainer type={historyItem.amount > 0 ? 'income' : 'outcome'}>
          {historyItem.amount > 0 ? '+ ' + historyItem.amount + ' ' : historyItem.amount.toString().split('-').join('- ') + ' '} 
          <FormattedMessage id="shop.points.txt" />
        </PointContainer>
      </Container>
    );
  }
}

export default HistoryItem;
