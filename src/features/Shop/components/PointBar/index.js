import { isMobile } from 'react-device-detect';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import { InlineText } from 'Components/Text';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding: ${isMobile ? `0.8rem 0.8rem` : `0.5rem 0.5rem`};
  ${({ bottomBorder }) =>
    bottomBorder &&
    isMobile &&
    `
    border: 0px;
    border-radius : 0;
    border-bottom: 1px solid lightGrey;
  `}
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 0.3rem;
`;

const PointLabelContent = styled.div`
  text-align: left;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

const PointValueContent = styled.div`
  text-align: right;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

const PointValue = styled.div`
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 2px 5px;
  background-color: #ead4dc;
`;

const PointBar = ({ value }) => {
  return (
    <Container bottomBorder>
      <Content>
        <PointLabelContent>
          <InlineText fontSize="0.875rem">
            <FormattedMessage id="shop.totalPoints.label" />
          </InlineText>
        </PointLabelContent>
        <PointValueContent>
          <PointValue>
            <InlineText fontSize="0.875rem">{value}</InlineText>
          </PointValue>
        </PointValueContent>
      </Content>
    </Container>
  );
};

export default PointBar;
