import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import styled from 'styled-components';

import heartActive from 'Assets/icons/btn-heart-active.svg';
import heartInactive from 'Assets/icons/btn-heart-inactive.svg';
import placeholder from 'Assets/images/profile-placeholder.png';

import { getLikedAngels } from '../../../data/selectors';
import { onAngelLike } from '../../../data/actions';
import API from '../../../api';
import StandByAndAvailableIcon from './components/StandByAndAvailableIcon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 0.5rem;
`;

const CustomImage = styled.img.attrs({
  alt: 'angel',
})`
  width: 5.5625rem;
  height: 5.5625rem;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.defaultGrey};
  position: relative;
  top: -5px;
`;

const ImageWrapper = styled.div``;
const Button = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
`;

const Icon = styled(Image)`
  &&& {
    position: absolute;
    top: -15px;
    left: -15px;
    z-index: 10;
    cursor: pointer;
  }
`;

const StandByAndAvailableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 3.0625rem;
`;

class AngelImage extends Component {
  constructor(props) {
    super(props);

    this.state = { liked: this.props.liked, errors: null };

    this.onClickHeart = this.onClickHeart.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.likedAngels !== prevProps.likedAngels) {
      const isAngelInList = this.props.likedAngels.find(
        id => id === this.props.id
      );

      this.setState(state => {
        if (isAngelInList) {
          return {
            ...state,
            liked: true,
          };
        }
        return {
          ...state,
          liked: false,
        };
      });
    }
  }

  onClickHeart(e) {
    e.stopPropagation();
    this.setState(
      {
        liked: !this.state.liked,
      },
      () => {
        this.state.liked ? this.likeAngel() : this.unLikeAngel();
      }
    );
  }

  likeAngel() {
    API.angelLike(this.props.id)
      .then(() => {
        this.props.onAngelLike(this.props.id);
      })
      .catch(err => {
        this.setState(state => ({
          errors: err,
          liked: !state.liked,
        }));
      });
  }

  unLikeAngel() {
    API.angelUnLike(this.props.id)
      .then(() => {
        this.props.onAngelLike(this.props.id);
      })
      .catch(err => {
        this.setState(state => ({
          errors: err,
          liked: !state.liked,
        }));
      });
  }

  goToProfile = id => () => {
    if (isMobile) {
      this.props.history.push(`angel/${this.props.id}`);
    } else {
      this.props.history.push(`/booking/search/angel/${this.props.id}`);
    }

    if (process.env.NODE_ENV === 'production') {
      window.analytics.track('FViewProfile', {
        angelID: this.props.id,
      });
    }
  };

  render() {
    const { image, fixed, standBy } = this.props;
    return (
      <Container>
        <Button onClick={this.onClickHeart}>
          <Icon src={this.state.liked ? heartActive : heartInactive} />
        </Button>
        <ImageWrapper>
          <CustomImage alt="Angel" circular src={image ? image : placeholder} />
        </ImageWrapper>
        {fixed || standBy ? (
          <StandByAndAvailableRow>
            <StandByAndAvailableIcon standBy={standBy} />
            <StandByAndAvailableIcon fixed={fixed} />
          </StandByAndAvailableRow>
        ) : null}
      </Container>
    );
  }
}

export default connect(
  state => ({
    likedAngels: getLikedAngels(state),
  }),
  {
    onAngelLike,
  }
)(withRouter(AngelImage));
