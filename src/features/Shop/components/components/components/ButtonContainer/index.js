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
  ${props => props.opacity && `opacity: ${props.opacity};`}

  ${({ theme }) =>
    !isMobile &&
    `
    background:  #fff;
    border: 1px solid ${theme.defaultGrey};
    border-bottom-left-radius: 0.3125rem;
    border-bottom-right-radius: 0.3125rem;
    margin-bottom: 0.3125rem;
    border-top: 0;
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

const PointContainer = styled.div`
  font-family: ${props => props.theme.primaryFont};
  font-weight: 600;
  font-size: 1.3rem;
`;

const PointDescContainer = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
  text-align: left;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 60%;
`;

const BtnContainer = styled.button`
  border: 0;
  background-color: ${props =>
    props.btnType === 0
      ? `#7eaebe`
      : props.btnType === 2
      ? `#bed7df`
      : `transparent`};
  width: 8rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 2rem;
  color: ${props =>
    props.btnType === 0 || props.btnType === 2 ? `#fff` : `#dd6e88`};
  ${props =>
    props.disabled && props.btnType !== 2
      ? `opacity: 0.5; cursor: default;`
      : props.btnType === 2
      ? `opacity: 1; cursor: default;`
      : `opacity: 1;`}
  &:focus {
    outline: 0;
  }
`;

class ButtonContainer extends React.Component {
  state = {
    buttonDisabled: false,
    buyButtonPressState: false,
  };

  componentWillMount() {}

  componentDidMount() {
    const { showType, gift, availablePoints } = this.props;

    if (gift.type === 'available' && gift.price === 0) {
      this.setState({ buttonDisabled: false });
    } else if (
      showType === 'all' &&
      !this.calcCanUsePointStatus(parseInt(availablePoints), gift.price)
    ) {
      this.setState({ buttonDisabled: true });
    } else if (gift.type === 'purchased') {
      this.setState({ buttonDisabled: false });
    } else if (gift.remainingCodes === 0) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  }

  calcCanUsePointStatus(totalPoints, price) {
    if (totalPoints >= price) {
      return true;
    } else return false;
  }

  onPressBuyButton = () => {
    this.setState({ buyButtonPressState: true });
  };

  onPressCompleteButton = () => {
    const { onPressBtn, gift } = this.props;
    onPressBtn && onPressBtn(gift);
  };

  onPressCancelButton = () => {
    this.setState({ buyButtonPressState: false });
  };

  renderAllButton() {
    const { border, divider, bottomBorder, gift } = this.props;
    const { buyButtonPressState } = this.state;

    return (
      <Container
        divider={divider}
        border={border}
        bottomBorder={bottomBorder}
        opacity={gift.type === 'purchased' ? 0.6 : 1.0}
      >
        {gift.type === 'available' && gift.price === 0 ? (
          <PointContainer>
            <FormattedMessage id="shop.free.txt" />
          </PointContainer>
        ) : gift.type === 'purchased' ? (
          gift.remainingCodes > 0 ? (
            <div>
              <PointContainer>
                {gift.price + ' '}
                <FormattedMessage id="shop.points.txt" />
              </PointContainer>
              {gift.remainingCodes < 30 && <PointDescContainer>
                <FormattedMessage
                  id="shop.gift.remaining.code"
                  values={{ code: gift.remainingCodes }}
                />
              </PointDescContainer>}
            </div>
          ) : (
            <PointContainer>
              {gift.price + ' '}
              <FormattedMessage id="shop.points.txt" />
            </PointContainer>
          )
        ) : gift.remainingCodes > 0 ? (
          <div>
            <PointContainer>
              {gift.price + ' '}
              <FormattedMessage id="shop.points.txt" />
            </PointContainer>
            {gift.remainingCodes < 30 && <PointDescContainer>
                <FormattedMessage
                  id="shop.gift.remaining.code"
                  values={{ code: gift.remainingCodes }}
                />
              </PointDescContainer>}
          </div>
        ) : (
          <PointContainer>
            {gift.price + ' '}
            <FormattedMessage id="shop.points.txt" />
          </PointContainer>
        )}

        {buyButtonPressState && gift.type === 'available' ? (
          <Content opacity={1.0}>
            <BtnContainer
              onClick={() => this.onPressCancelButton()}
              btnType={1}
            >
              <FormattedMessage id="shop.cancel.txt" />
            </BtnContainer>
            <BtnContainer
              onClick={() => this.onPressCompleteButton()}
              btnType={0}
            >
              <FormattedMessage id="shop.complete.txt" />
            </BtnContainer>
          </Content>
        ) : (
          <BtnContainer
            onClick={() => this.onPressBuyButton()}
            disabled={this.state.buttonDisabled}
            btnType={gift.remainingCodes === 0 ? 2 : 0}
          >
            {gift.type === 'available' && gift.price === 0 ? (
              <FormattedMessage id="shop.add.txt" />
            ) : gift.type === 'purchased' ? (
              <FormattedMessage id="shop.purchased.txt" />
            ) : gift.remainingCodes === 0 ? (
              <FormattedMessage id="shop.soldOut.txt" />
            ) : (
              <FormattedMessage id="shop.buy.txt" />
            )}
          </BtnContainer>
        )}
      </Container>
    );
  }

  renderPurchasedButton() {
    const { border, divider, bottomBorder, gift } = this.props;

    return (
      <Container
        divider={divider}
        border={border}
        bottomBorder={bottomBorder}
        opacity={1.0}
      >
        <div>
          <PointContainer>
            <FormattedMessage id="shop.purchased.txt" />
          </PointContainer>
          <PointDescContainer>
            {moment(gift.date).format('MMMM DD, YYYY')}
          </PointDescContainer>
        </div>

        <BtnContainer
          onClick={() => this.onPressCompleteButton()}
          disabled={this.state.buttonDisabled}
          btnType={0}
        >
          <FormattedMessage id="shop.view.txt" />
        </BtnContainer>
      </Container>
    );
  }

  render() {
    const { showType } = this.props;

    return (
      <React.Fragment>
        {showType === 'all'
          ? this.renderAllButton()
          : this.renderPurchasedButton()}
      </React.Fragment>
    );
  }
}

export default ButtonContainer;
