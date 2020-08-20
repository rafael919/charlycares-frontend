import { FormattedMessage } from 'react-intl';
import { getAge } from 'Utils';
import { Image, Rating } from 'semantic-ui-react';
import {
  renderDistanceInKilometers,
  renderTimeInHours,
  roundMonetaryValue,
} from 'Utils';
import { isMobile } from 'react-device-detect';
import React from 'react';
import styled from 'styled-components';

import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import connectionsIcon from 'Assets/icons/icn-feature-connections.svg';
import dayIcon from 'Assets/icons/icn-feature-day.svg';
import locationIcon from 'Assets/icons/icn-feature-location.svg';
import nightIcon from 'Assets/icons/icn-feature-night.svg';

const FeaturesContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: ${isMobile ? '3.2vw;' : '2.2vw;'}
  min-width: 16px;
`;

const CustomHeader = styled.h5`
  margin: 0;
`;

const FeatureDesc = styled.div`
  font-size: 0.75rem;
`;

const ResponseTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.grey};
`;

const Wrapper = styled.div`
  cursor: pointer;
`;

const AngelFeatures = ({
  name,
  age,
  liked,
  onLike,
  rating,
  onRate,
  distance,
  dailyPrice,
  nightlyPrice,
  baby,
  connections,
  avgResponse,
}) => {
  return (
    <Wrapper>
      <CustomHeader>
        {name} ({getAge(age)})
      </CustomHeader>
      <Rating
        size="mini"
        rating={Math.round(rating)}
        onRate={onRate}
        maxRating={5}
        disabled={onRate === undefined}
      />
      <FeaturesContainer>
        <Feature>
          <Image src={locationIcon} />
          <FeatureDesc>{renderDistanceInKilometers(distance)}</FeatureDesc>
        </Feature>
        <Feature>
          <Image src={dayIcon} />
          <FeatureDesc>€ {roundMonetaryValue(dailyPrice)}</FeatureDesc>
        </Feature>
        <Feature>
          <Image src={nightIcon} />
          <FeatureDesc>€ {roundMonetaryValue(nightlyPrice)}</FeatureDesc>
        </Feature>
        {connections && (
          <Feature>
            <Image src={connectionsIcon} />
            <FeatureDesc>{connections}</FeatureDesc>
          </Feature>
        )}
        {baby && (
          <Feature>
            <Image src={babyIcon} />
            <FeatureDesc>baby</FeatureDesc>
          </Feature>
        )}
      </FeaturesContainer>
      <ResponseTime>
        <FormattedMessage id="booking.search.responseTime" />{' '}
        {renderTimeInHours(avgResponse ? avgResponse : 60)}
      </ResponseTime>
    </Wrapper>
  );
};

export default AngelFeatures;
