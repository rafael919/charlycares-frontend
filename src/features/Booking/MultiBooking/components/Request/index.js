import React from 'react';
import styled from 'styled-components';
import { InlineText } from 'Components/Text';
import { Grid, Image } from 'semantic-ui-react';
import Divider from 'Components/Divider';
import CustomRow from 'Components/CustomRow';
import CustomColumn from 'Components/CustomColumn';

import rightArrow from 'Assets/icons/btn-large-arrow-right.svg';

const DateTimeValueText = styled.span`
  color: ${props => props.theme.lightGrey};
  font-family: ${props => props.theme.primaryFont};
`;

const RepeatLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconWrapper = styled.div`
  margin-right: -0.2rem;
  margin-left: 0.5rem;
`;

const Request = () => {
  return (
    <div>
      <Divider>Request 1</Divider>
      <Grid container>
        <CustomRow padding="2rem 0 1rem 0">
          <CustomColumn width={4}>
            <InlineText primaryFont>Start</InlineText>
          </CustomColumn>
          <CustomColumn noPadding textAlign="right" width={8}>
            <DateTimeValueText>di. 16 januari</DateTimeValueText>
          </CustomColumn>
          <CustomColumn padding="0 1rem 0 0" textAlign="right" width={4}>
            <DateTimeValueText>14:00</DateTimeValueText>
          </CustomColumn>
        </CustomRow>
        <CustomRow noPadding>
          <CustomColumn width={4}>
            <InlineText primaryFont>End</InlineText>
          </CustomColumn>
          <CustomColumn textAlign="right" width={12}>
            <DateTimeValueText>14:00</DateTimeValueText>
          </CustomColumn>
        </CustomRow>
        <CustomRow padding="1rem 0 2rem 0">
          <CustomColumn width={4}>
            <InlineText primaryFont>Repeat</InlineText>
          </CustomColumn>
          <CustomColumn textAlign="right" width={12}>
            <RepeatLinkWrapper>
              <InlineText primaryFont accentText>
                11 x
              </InlineText>
              <IconWrapper>
                <Image src={rightArrow} />
              </IconWrapper>
            </RepeatLinkWrapper>
          </CustomColumn>
        </CustomRow>
      </Grid>
    </div>
  );
};

export default Request;
