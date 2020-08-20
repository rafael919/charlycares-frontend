import React from 'react';
import styled from 'styled-components';
import { Paragraph } from 'Components/Text';
import moment from 'moment';

const CommentContainer = styled.div`
  display: flex;
  align-items : center;
  justify-content : center;
  flex-direction : column;
`;

const From = styled.div`
  font-size: 0.9375rem;
  position: relative;
`;

const formatDate = date => moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY');

const Comment = ({ review }) => {
  var ratings = []
  for(var i=0;i<review.rating.length;i++){
    ratings.push(<i class="icon" key = {i}></i>)
  }
  return (
    
    <CommentContainer>
      
      <From>
        <div style = {{fontWeight : '500',fontSize : 18,marginBottom : 5}}> 
          {review.first_name}
        </div>
        {/* <CustomImage src={} /> */}
      </From>
      {/* <Rating size="mini" rating={review.rating} maxRating={5}/> */}
        {/* Custom rating code need to be revisited because not able to change star color using default rating code */}
         {review.rating === 1 ?
            <div class="ui rating">
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i class="icon"></i>
              <i class="icon"></i>
              <i class="icon"></i>
              <i class="icon"></i> 
            </div> : review.rating === 2 ?
            <div class="ui rating">
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i class="icon"></i>
              <i class="icon"></i>
              <i class="icon"></i> 
            </div> : review.rating === 3 ?
            <div class="ui rating">
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i class="icon"></i>
              <i class="icon"></i> 
            </div> : review.rating === 4 ?
            <div class="ui rating">
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i class="icon"></i> 
            </div> : review.rating === 5 ?
            <div class="ui rating">
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
              <i style = {{color : '#FF4F81'}} class="icon"></i>
            </div> : null

          }
                                                                                                                                                                                                                                                                    
        {/* <i class="icon"></i>
        <i class="icon"></i>
        <i class="icon"></i>
        <i class="icon"></i>
        <i class="icon"></i> */}
      <span style = {{marginTop : 10,fontWeight : '500',textOverflow : 'ellipsis'}}>
      <Paragraph fontSize="1.0675rem" light>
         {review.comments}
      </Paragraph>
      </span>
      <div style = {{color : 'rgb(156,156,159)' ,fontSize : 14 ,marginTop : 20}}>
        {formatDate(review.created_at)}
      </div>
    </CommentContainer>
  );
};

export default Comment;
