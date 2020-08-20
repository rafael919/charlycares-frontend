import React from 'react';
import styled from 'styled-components';
import Toggle from 'Components/Toggle';
import { FormattedMessage } from 'react-intl';
import addIcon from 'Assets/icons/btn-check-off.svg';
import checkIcon from 'Assets/icons/btn-check-on.svg';
import ListDivider from 'Components/ListDivider';
import Divider from 'Components/Divider';
import InputRange from 'react-input-range';

import './slider.css';
import DogIcon from 'Assets/icons/icn-feature-dog.svg';
import CatIcon from 'Assets/icons/icn-feature-cat.svg';

const Container = styled.div`
  padding: 1.5rem 1rem 5rem;
`;

const Heading = styled.h1`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.primaryFont};
  font-weight: 600;
`;

const PreferenceHeading = Heading.extend`
  font-size: 0.975rem;
  margin-bottom: 1.5rem;
`;

const Intro = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`

const Desc = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
  padding-top: 0.75rem;
  display: -webkit-inline-box;
`;

const DescSub = styled.p`
  font-weight: 300;
  font-size: 0.875rem;
  color: ${props => props.theme.lightGrey};
  margin-left: 0.25rem;
`
const PreferencesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SubDescription = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${props => props.theme.lightGrey};
  `;

const Button = styled.td`
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  text-align: center;
  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img`
  width: 44px;
  height: 44px;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.tr`
  margin-top: 1rem;
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.td`
  padding: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.theme.lightGrey};
  font-weight: 300;
`;

const TableHeaderCellFirst = styled.td`
  width: 70%;
`

const TableBody = styled.tbody``;

const renderBookingLengthPreferences = (preferences, onPreferenceChange) => {
  return (<Table>
    <TableBody>
      <TableHeader>
        <TableHeaderCellFirst />
        <TableHeaderCell>
          <FormattedMessage id="angel.preferences.week" />
        </TableHeaderCell>
        <TableHeaderCell>
          <FormattedMessage id="angel.preferences.weekend" />
        </TableHeaderCell>
      </TableHeader>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingLength1" />
        </Desc>
        <Button onClick={onPreferenceChange('week_duration_request4', 'bool')}>
          <Icon src={preferences.week_duration_request4.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_duration_request4', 'bool')}>
          <Icon src={preferences.weekend_duration_request4.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingLength2" />
        </Desc>
        <Button onClick={onPreferenceChange('week_duration_request6', 'bool')}>
          <Icon src={preferences.week_duration_request6.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_duration_request6', 'bool')}>
          <Icon src={preferences.weekend_duration_request6.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingLength3" />
        </Desc>
        <Button onClick={onPreferenceChange('week_duration_request8', 'bool')}>
          <Icon src={preferences.week_duration_request8.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_duration_request8', 'bool')}>
          <Icon src={preferences.weekend_duration_request8.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingLength4" />
        </Desc>
        <Button onClick={onPreferenceChange('week_duration_request_over_8', 'bool')}>
          <Icon src={preferences.week_duration_request_over_8.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_duration_request_over_8', 'bool')}>
          <Icon src={preferences.weekend_duration_request_over_8.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
    </TableBody>
  </Table>)
};

const renderBookingMomentPreferences = (preferences, onPreferenceChange) => {
  return (<Table>
    <TableBody>
      <TableHeader>
        <TableHeaderCellFirst />
        <TableHeaderCell>
          <FormattedMessage id="angel.preferences.week" />
        </TableHeaderCell>
        <TableHeaderCell>
          <FormattedMessage id="angel.preferences.weekend" />
        </TableHeaderCell>
      </TableHeader>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingMoment1" />
          <DescSub>
            <FormattedMessage id="angel.preferences.bookingMoment1sub" />
          </DescSub>
        </Desc>
        <Button onClick={onPreferenceChange('week_early_morning', 'bool')}>
          <Icon src={preferences.week_early_morning.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_early_morning', 'bool')}>
          <Icon src={preferences.weekend_early_morning.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingMoment2" />
          <DescSub>
            <FormattedMessage id="angel.preferences.bookingMoment2sub" />
          </DescSub>
        </Desc>
        <Button onClick={onPreferenceChange('week_morning', 'bool')}>
          <Icon src={preferences.week_morning.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_morning', 'bool')}>
          <Icon src={preferences.weekend_morning.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingMoment3" />
          <DescSub>
            <FormattedMessage id="angel.preferences.bookingMoment3sub" />
          </DescSub>
        </Desc>
        <Button onClick={onPreferenceChange('week_afternoon', 'bool')}>
          <Icon src={preferences.week_afternoon.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_afternoon', 'bool')}>
          <Icon src={preferences.weekend_afternoon.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingMoment4" />
          <DescSub>
            <FormattedMessage id="angel.preferences.bookingMoment4sub" />
          </DescSub>
        </Desc>
        <Button onClick={onPreferenceChange('after_school_requests', 'bool')}>
          <Icon src={preferences.after_school_requests.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button>
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingMoment5" />
          <DescSub>
            <FormattedMessage id="angel.preferences.bookingMoment5sub" />
          </DescSub>
        </Desc>
        <Button onClick={onPreferenceChange('week_evening', 'bool')}>
          <Icon src={preferences.week_evening.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_evening', 'bool')}>
          <Icon src={preferences.weekend_evening.pivot.value ? checkIcon : addIcon} />
        </Button>
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.bookingMoment6" />
        </Desc>
        <Button>
        </Button>
        <Button>
          <Toggle 
            value={preferences.late_night_bookings.pivot.value} 
            onChange={onPreferenceChange('late_night_bookings', 'bool')}
            marginRight={'1rem'}
          />
        </Button>
      </TableRow>
    </TableBody>
  </Table>)
};

const renderAdvancedNoticePreferences = (preferences, onPreferenceChange) => {
  return (<Table>
    <TableBody>
      <TableHeader>
        <TableHeaderCellFirst />
        <TableHeaderCell>
          <FormattedMessage id="angel.preferences.week" />
        </TableHeaderCell>
        <TableHeaderCell>
          <FormattedMessage id="angel.preferences.weekend" />
        </TableHeaderCell>
      </TableHeader>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.advancedNotice1" />
        </Desc>
        <Button onClick={onPreferenceChange('week_last_minute_requests', 'bool')}>
          <Icon src={preferences.week_last_minute_requests.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_last_minute_requests', 'bool')}>
          <Icon src={preferences.weekend_last_minute_requests.pivot.value ? checkIcon : addIcon} />
        </Button>      
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.advancedNotice2" />
        </Desc>
        <Button onClick={onPreferenceChange('week_advanced_notice2', 'bool')}>
          <Icon src={preferences.week_advanced_notice2.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_advanced_notice2', 'bool')}>
          <Icon src={preferences.weekend_advanced_notice2.pivot.value ? checkIcon : addIcon} />
        </Button>      
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.advancedNotice3" />
        </Desc>
        <Button onClick={onPreferenceChange('week_advanced_notice3', 'bool')}>
          <Icon src={preferences.week_advanced_notice3.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_advanced_notice3', 'bool')}>
          <Icon src={preferences.weekend_advanced_notice3.pivot.value ? checkIcon : addIcon} />
        </Button>     
      </TableRow>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.advancedNotice4" />
        </Desc>
        <Button onClick={onPreferenceChange('week_advanced_notice4', 'bool')}>
          <Icon src={preferences.week_advanced_notice4.pivot.value ? checkIcon : addIcon} />
        </Button>
        <Button onClick={onPreferenceChange('weekend_advanced_notice4', 'bool')}>
          <Icon src={preferences.weekend_advanced_notice4.pivot.value ? checkIcon : addIcon} />
        </Button>     
      </TableRow>
    </TableBody>
  </Table>)
};

const renderAnimalPreferences = (preferences, onPreferenceChange) => {
  return (<Table>
    <TableBody>
      <TableHeader>
        <TableHeaderCellFirst />
        <TableHeaderCell>
        </TableHeaderCell>
        <TableHeaderCell>
        </TableHeaderCell>
      </TableHeader>
      <TableRow>
        <Desc>
          <AnimalIcon src={DogIcon} />
          <FormattedMessage id="angel.preferences.animals1" />
        </Desc>
        <Button>
        </Button>
        <Button onClick={onPreferenceChange('likes_dog', 'bool')}>
          <Icon src={preferences.likes_dog.pivot.value ? checkIcon : addIcon} />
        </Button>  
      </TableRow>
      <TableRow>
        <Desc>
          <AnimalIcon src={CatIcon} />
          <FormattedMessage id="angel.preferences.animals2" />
        </Desc>
        <Button>
        </Button>
        <Button onClick={onPreferenceChange('likes_cat', 'bool')}>
          <Icon src={preferences.likes_cat.pivot.value ? checkIcon : addIcon} />
        </Button>  
      </TableRow>
    </TableBody>
  </Table>)
};

const AnimalIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  margin-right: 0.5rem;
`

const SliderContainer = styled.div`
  margin-right: 1.5rem;
`;

const SliderTitleContainer = styled.div`
  width: 100%;
  display: inline-block;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const SliderTitle = styled.div`
  float: left;
  width: 59%;
`;

const SliderValue = styled.div`
  float: right; 
  width: 40%;
  text-align: right;
  font-weight: 300;
`;

const renderChildrenPreferences = (preferences, onPreferenceChange) => {
  console.log(preferences);
  return (
    <SliderContainer>
      <SliderTitleContainer>
        <SliderTitle>
          <FormattedMessage id="angel.preferences.childrenSliderTitle" />
        </SliderTitle>
        <SliderValue>
          <FormattedMessage
            id="angel.preferences.childrenSliderValue"
            values={{
              kidsCount: preferences.max_number_kids.pivot.value,
            }}
          />
        </SliderValue>
      </SliderTitleContainer>
      <InputRange
        step={1}
        draggableTrack
        maxValue={5}
        minValue={1}
        value={preferences.max_number_kids.pivot.value}
        onChange={onPreferenceChange('max_number_kids', 'slider')}
      />
    </SliderContainer>
  )
};

const renderDistancePreferences = (preferences, onPreferenceChange) => {
  return (
    <SliderContainer>
      <SliderTitleContainer>
        <SliderTitle>
          <FormattedMessage id="angel.preferences.distanceSliderTitle" />
        </SliderTitle>
        <SliderValue>
          <FormattedMessage
            id="angel.preferences.distanceSliderValue"
            values={{
              maxDistance: preferences.journey_time.pivot.value,
            }}
          />
        </SliderValue>
      </SliderTitleContainer>
      <InputRange
        step={1}
        draggableTrack
        maxValue={45}
        minValue={10}
        value={preferences.journey_time.pivot.value}
        onChange={onPreferenceChange('journey_time', 'slider')}
      />
    </SliderContainer>
  );
};

const renderKidsAgePreferences = (preferences, onPreferenceChange, minAgeChildren) => {
  console.log(minAgeChildren);
  return (
    <SliderContainer>
      <SliderTitleContainer>
        <SliderTitle>
          <FormattedMessage id="angel.preferences.kidsAgeSliderTitle" />
        </SliderTitle>
        <SliderValue>
          <FormattedMessage
            id="angel.preferences.kidsAgeSliderValue"
            values={{
              minAge: preferences.min_kids_age.pivot.value,
              maxAge: preferences.max_kids_age.pivot.value
            }}
          />
        </SliderValue>
      </SliderTitleContainer>
      <InputRange
        step={1}
        draggableTrack
        maxValue={15}
        minValue={minAgeChildren / 12}
        value={{min: preferences.min_kids_age.pivot.value, max: preferences.max_kids_age.pivot.value}}
        onChange={onPreferenceChange('kids_age', 'slider')}
      />
    </SliderContainer>
  );
};

const renderOnlyExistingFamilies = (preferences, onPreferenceChange) => {
  return (<Table>
    <TableBody>
      <TableHeader>
        <TableHeaderCellFirst />
        <TableHeaderCell>
        </TableHeaderCell>
        <TableHeaderCell>
        </TableHeaderCell>
      </TableHeader>
      <TableRow>
        <Desc>
          <FormattedMessage id="angel.preferences.newFamilies" />
        </Desc>
        <Button>
        </Button>
        <Toggle 
          value={preferences.only_accept_invites_from_favourite_families.pivot.value} 
          onChange={onPreferenceChange('only_accept_invites_from_favourite_families', 'bool')}
          marginRight={'1rem'}
        />
      </TableRow>
    </TableBody>
  </Table>)
};

const Preferences = ({ preferences, onPreferenceChange, minAgeChildren }) => (
  <Container>
    <Heading>
      <FormattedMessage id="profile.angel.preferences.heading" />
    </Heading>
    <Intro>
      <FormattedMessage id="profile.angel.preferences.desc" />
    </Intro>
    <Divider inner />
    <PreferenceHeading>
      <FormattedMessage id="profile.angel.preferences.preferencesSectionHeading" />
    </PreferenceHeading>
    <PreferencesList>
      <SubDescription>
        <FormattedMessage id="angel.preferences.bookingLengthDescription" />
      </SubDescription>
      {renderBookingLengthPreferences(preferences, onPreferenceChange)}
      <ListDivider />
      <SubDescription>
        <FormattedMessage id="angel.preferences.bookingMomentDescription" />
      </SubDescription>
      {renderBookingMomentPreferences(preferences, onPreferenceChange)}
      <ListDivider />
      <SubDescription>
        <FormattedMessage id="angel.preferences.advancedNoticeTitle" />
      </SubDescription>
      {renderAdvancedNoticePreferences(preferences, onPreferenceChange)}
      <Divider inner />
      <PreferenceHeading>
        <FormattedMessage id="angel.preferences.generalSectionHeading" />
      </PreferenceHeading>
      <SubDescription>
        <FormattedMessage id="angel.preferences.animalsTitle" />
      </SubDescription>
      {renderAnimalPreferences(preferences, onPreferenceChange)}
      <ListDivider />
      <SubDescription>
        <FormattedMessage id="angel.preferences.childrenTitle" />
      </SubDescription>
      {renderChildrenPreferences(preferences, onPreferenceChange)}
      <ListDivider />
      <SubDescription>
        <FormattedMessage id="angel.preferences.kidsAgeTitle" />
      </SubDescription>
      {renderKidsAgePreferences(preferences, onPreferenceChange, minAgeChildren)}
      <ListDivider />
      <SubDescription>
        <FormattedMessage id="angel.preferences.distanceTitle" />
      </SubDescription>
      {renderDistancePreferences(preferences, onPreferenceChange)}
      {renderOnlyExistingFamilies(preferences, onPreferenceChange)}
    </PreferencesList>
  </Container>
);

export default Preferences;
