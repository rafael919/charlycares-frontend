import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import Toggle from 'Components/Toggle';

import angel from 'Assets/images/angel.png';
import heartIcon from 'Assets/icons/btn-heart-active.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1rem 0;

  &:last-child {
    margin: 0;
  }
`;
const ImageAndNameContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
`;
const CustomImage = styled(Image)`
  &&& {
    width: 2.5625rem;
    height: 2.5625rem;
  }
`;

const LikedIcon = styled(Image)`
  &&& {
    position: absolute;
    left: -0.375rem;
    top: -0.375rem;
    width: 1rem;
    height: 1rem;
  }
`;

const AngelName = styled.div`
  font-size: 0.9375rem;
  margin-left: 0.5rem;
`;

const ToggleWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Angel = ({ liked }) => {
  return (
    <Wrapper>
      <ImageAndNameContainer>
        <CustomImage src={angel} /> <AngelName>Angelique</AngelName>
        {liked && <LikedIcon src={heartIcon} />}
      </ImageAndNameContainer>
      <ToggleWrapper>
        <Toggle
          name="angel1"
          onChange={() => {}}
          value={true}
          onBlur={() => {}}
        />
      </ToggleWrapper>
    </Wrapper>
  );
};

export default Angel;
