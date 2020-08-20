import { Image } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import heartActive from 'Assets/icons/btn-heart-active.svg';

const Angel = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.9375rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AngelName = styled.div`
  font-size: 0.9375rem;
`;

const CustomImage = styled(Image)`
  &&& {
    width: 41px;
    height: 41px;
    margin-right: 0.9375rem;
    border: 1px solid #fff;
    border-radius: 50%;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  }
`;

const Liked = styled(Image)`
  &&& {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: -0.3125rem;
    top: -0.1875rem;
  }
`;

const SelectedAngel = ({ liked, name, img }) => {
  return (
    <Angel>
      {img ? <CustomImage circular src={img} /> : null}
      {liked ? <Liked src={heartActive} /> : null}
      <AngelName>{name}</AngelName>
    </Angel>
  );
};

export default SelectedAngel;
