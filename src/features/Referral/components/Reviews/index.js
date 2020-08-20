import { Header } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';

import Comment from '../Comment';
import Carousel from 'nuka-carousel';
import checkIcon from 'Assets/icons/icn-check-blue.svg';
const Icon = styled.img``;
const ReviewsContainer = styled.div`
  height : 1rem;
  padding: 1rem;
`;

const Reviews = ({ ratings = [] }) => {
  
  return (
    <ReviewsContainer id="reviews">
      <Header as="h5">
        {/* <FormattedMessage
          id="booking.angel.ratingsHeader"
          values={{ reviews: ratings.length }}
        /> */}
      </Header>
      
      <div style = {{minHeight : 300,marginTop : 30}}>
        <Carousel heightMode = {false} initialSlideHeight = {200} cellAlign = 'center' renderCenterLeftControls = {false} renderCenterRightControls = {false} swiping = {true}>
        {ratings.map(review => (
          <Comment key={review.id} review={review} />
        ))}
        </Carousel>
      </div>
      <div style = {{height : 3,width : '100%',backgroundColor : 'rgb(249,248,249)',borderWidth : 1,marginTop : -70 }}></div>
      <div style = {{marginTop : 10,marginBottom : 20}}>
        <div style = {{marginTop : 10, display : 'flex',flexDirection : "row"}}>
          <div style ={{width : 18,height : 18}}>
              <Icon src={checkIcon}/>
          </div>
          <div style = {{textAlign : 'left',marginLeft : 20,marginTop : 2,color : "rgb(57,56,62)"}}>
            <FormattedMessage id = "referral.landing.review.point1" />
          </div>
        </div>
        <div style = {{marginTop : 10, display : 'flex',flexDirection : "row"}}>
          <div style ={{width : 18,height : 18}}>
              <Icon src={checkIcon}/>
          </div>
          <div style = {{textAlign : 'left',marginLeft : 20,marginTop : 2,color : "rgb(57,56,62)"}}>
            <FormattedMessage id = "referral.landing.review.point2" />
          </div>
        </div>
        <div style = {{marginTop : 10, display : 'flex',flexDirection : "row"}}>
          <div style ={{width : 18,height : 18}}>
              <Icon src={checkIcon}/>
          </div>
          <div style = {{textAlign : 'left',marginLeft : 20,marginTop : 2,color : "rgb(57,56,62)"}}>
            <FormattedMessage id = "referral.landing.review.point3" />
          </div>
        </div>
      </div>
    </ReviewsContainer>
  );
};

export default Reviews;
