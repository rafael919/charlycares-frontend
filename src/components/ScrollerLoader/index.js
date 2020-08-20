import { Loader } from 'semantic-ui-react';
import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

const ScrollerLoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5vw;
  margin-bottom: ${isMobile ? '15vw' : '5vw'};
  height: 8vw;
`;

const ScrollerLoader = () => (
  <ScrollerLoaderWrapper>
    <Loader size="medium" active />
  </ScrollerLoaderWrapper>
);

export default ScrollerLoader;
