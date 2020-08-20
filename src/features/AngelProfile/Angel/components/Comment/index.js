import React from 'react';
import styled from 'styled-components';
import { Rating, Image } from 'semantic-ui-react';
import { Paragraph } from 'Components/Text';
import avatar from 'Assets/images/avatar.png';

const CommentContainer = styled.div`
  padding-bottom: 1.75rem;
`;

const From = styled.div`
  font-size: 0.9375rem;
  position: relative;
`;

const CustomImage = styled(Image)`
  &&& {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const Comment = () => {
  return (
    <CommentContainer>
      <From>
        <div>Iris - 6 juni 2017</div>
        <CustomImage src={avatar} />
      </From>
      <Rating size="mini" defaultRating={3} maxRating={5} disabled />
      <Paragraph fontSize="0.9375rem" light>
        Onze eerste oppas-ervaring, en een goede. Dominique wist Arlette gerust
        te stellen en hebben een hele leuke middag gehad. Volgende afspraak
        geboekt :)
      </Paragraph>
    </CommentContainer>
  );
};

export default Comment;
