import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import Comment from '../Comment';

const ReviewsContainer = styled.div`
  text-align: left;
`;

const Reviews = () => {
  return (
    <ReviewsContainer>
      <Header as="h5">Parents about Dominique (36 x)</Header>
      <Comment />
      <Comment />
      <Comment />
    </ReviewsContainer>
  );
};

export default Reviews;
