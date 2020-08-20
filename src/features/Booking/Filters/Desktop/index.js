import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Grid, Divider } from 'semantic-ui-react';
import { InlineText } from 'Components/Text';
import { filterAngels } from '../../data/actions';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import InputRange from 'react-input-range';
import React, { Component, Fragment } from 'react';
import Navigation from 'Components/Navigation';

import babyIcon from 'Assets/icons/icn-feature-baby.svg';
import driverIcon from 'Assets/icons/icn-feature-driverslicence.svg';
import firstAidIcon from 'Assets/icons/icn-feature-first-aid-large.svg';
import proIcon from 'Assets/icons/icn-feature-pro-large.svg';

import { getDefaultFilters, getFilterValues } from '../selectors';
import { getAvailableAngels } from '../../data/selectors';
import {
  onAgeFilterChange,
  onBabyFilterChange,
  onDistanceFilterChange,
  onDriverFilterChange,
  onEhboFilterChange,
  onFiltersReset,
  onPriceFilterChange,
  onProFilterChange,
} from '../actions';
import BtnContainer from '../components/BtnContainer';
import BtnImage from '../components/BtnImage';
import ClearButton from '../components/ClearBtn';
import Description from '../components/Description';
import DescriptionHeader from '../components/Header';
import Feature from '../components/Feature';
import FeaturesList from '../components/FeaturesList';
import Icon from '../components/Icon';
import IconContainer from '../components/IconContainer';
import TextContainer from '../components/TextContainer';

import '../slider.css';

class Filters extends Component {
  onFiltersClose = () => {
    this.props.toggleFilters();
    this.props.filterAngels(
      this.props.availableAngels,
      this.props.default,
      this.props.selected
    );
  };

  render() {
    return (
      <Fragment>
        <Navigation
          noPadding
          withBorder
          title={<FormattedMessage id="booking.filters.navTitle" />}
          onClose={this.onFiltersClose}
          rightComp={() => (
            <ClearButton onClick={this.props.onFiltersReset}>
              <FormattedMessage id="booking.filters.clear" />
            </ClearButton>
          )}
        />
        <CustomColumn padding="0 1rem 3rem 1rem">
          <CustomColumn noPadding>
            <CustomRow padding="3rem 0 0.625rem 0">
              <CustomColumn padding="0 0.7rem" width={8}>
                <InlineText primaryFont bold>
                  <FormattedMessage id="booking.filters.age" />
                </InlineText>
              </CustomColumn>
              <CustomColumn padding="0 0.7rem" textAlign="right" width={8}>
                <InlineText light>
                  <FormattedMessage
                    id="booking.filters.ageSpread"
                    values={{
                      min: this.props.selected.age.min,
                      max: this.props.selected.age.max,
                    }}
                  />
                </InlineText>
              </CustomColumn>
            </CustomRow>
            <CustomRow>
              <CustomColumn padding="0 1.5rem">
                <InputRange
                  step={1}
                  draggableTrack
                  maxValue={this.props.default.age.max}
                  minValue={this.props.default.age.min}
                  value={this.props.selected.age}
                  onChange={this.props.onAgeFilterChange}
                />
              </CustomColumn>
            </CustomRow>
            <CustomRow padding="1rem 0 0.625rem 0">
              <CustomColumn padding="0 0.7rem" width={8}>
                <InlineText primaryFont bold>
                  <FormattedMessage id="booking.filters.distance" />
                </InlineText>
              </CustomColumn>
              <CustomColumn padding="0 0.7rem" textAlign="right" width={8}>
                <InlineText light>
                  <FormattedMessage
                    id="booking.filters.distanceSpread"
                    values={{
                      min: this.props.selected.distance.min,
                      max: this.props.selected.distance.max,
                    }}
                  />
                </InlineText>
              </CustomColumn>
            </CustomRow>
            <CustomRow>
              <CustomColumn padding="0 1.5rem">
                <InputRange
                  step={0.1}
                  draggableTrack
                  maxValue={this.props.default.distance.max}
                  minValue={this.props.default.distance.min}
                  value={this.props.selected.distance}
                  onChange={this.props.onDistanceFilterChange}
                />
              </CustomColumn>
            </CustomRow>
            <CustomRow padding="1rem 0 0.625rem 0">
              <CustomColumn padding="0 0.7rem" width={8}>
                <InlineText primaryFont bold>
                  <FormattedMessage id="booking.filters.price" />
                </InlineText>
              </CustomColumn>
              <CustomColumn padding="0 0.7rem" textAlign="right" width={8}>
                <InlineText light>
                  <FormattedMessage
                    id="booking.filters.priceSpread"
                    values={{
                      min: this.props.selected.price.min,
                      max: this.props.selected.price.max,
                    }}
                  />
                </InlineText>
              </CustomColumn>
            </CustomRow>
            <CustomRow padding="1rem 0 4rem 0">
              <CustomColumn padding="0 1.5rem">
                <InputRange
                  step={1}
                  draggableTrack
                  maxValue={this.props.default.price.max}
                  minValue={this.props.default.price.min}
                  value={this.props.selected.price}
                  onChange={this.props.onPriceFilterChange}
                />
              </CustomColumn>
            </CustomRow>
            <Divider />
            <Grid.Row>
              <CustomColumn noPadding>
                <FeaturesList>
                  <Feature>
                    <IconContainer>
                      <Icon src={proIcon} />
                    </IconContainer>
                    <TextContainer>
                      <DescriptionHeader>
                        <FormattedMessage id="booking.filters.proHeading" />
                      </DescriptionHeader>
                      <Description>
                        <FormattedMessage id="booking.filters.proDesc" />
                      </Description>
                    </TextContainer>
                    <BtnContainer>
                      <BtnImage
                        selected={this.props.selected.pro}
                        onClick={this.props.onProFilterChange}
                      />
                    </BtnContainer>
                  </Feature>
                  <Feature>
                    <IconContainer>
                      <Icon src={firstAidIcon} />
                    </IconContainer>
                    <TextContainer>
                      <DescriptionHeader>
                        <FormattedMessage id="booking.filters.ehboHeading" />
                      </DescriptionHeader>
                      <Description>
                        <FormattedMessage id="booking.filters.ehboDesc" />
                      </Description>
                    </TextContainer>
                    <BtnContainer>
                      <BtnImage
                        selected={this.props.selected.ehbo}
                        onClick={this.props.onEhboFilterChange}
                      />
                    </BtnContainer>
                  </Feature>
                  <Feature>
                    <IconContainer>
                      <Icon src={babyIcon} />
                    </IconContainer>
                    <TextContainer>
                      <DescriptionHeader>
                        <FormattedMessage id="booking.filters.babyHeading" />
                      </DescriptionHeader>
                      <Description>
                        <FormattedMessage id="booking.filters.babyDesc" />
                      </Description>
                    </TextContainer>
                    <BtnContainer>
                      <BtnImage
                        selected={this.props.selected.baby}
                        onClick={this.props.onBabyFilterChange}
                      />
                    </BtnContainer>
                  </Feature>
                  <Feature>
                    <IconContainer>
                      <Icon src={driverIcon} />
                    </IconContainer>
                    <TextContainer>
                      <DescriptionHeader>
                        <FormattedMessage id="booking.filters.driverHeading" />
                      </DescriptionHeader>
                      <Description>
                        <FormattedMessage id="booking.filters.driverDesc" />
                      </Description>
                    </TextContainer>
                    <BtnContainer>
                      <BtnImage
                        selected={this.props.selected.driver}
                        onClick={this.props.onDriverFilterChange}
                      />
                    </BtnContainer>
                  </Feature>
                </FeaturesList>
              </CustomColumn>
            </Grid.Row>
          </CustomColumn>
        </CustomColumn>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  default: getDefaultFilters(state),
  selected: getFilterValues(state),
  availableAngels: getAvailableAngels(state),
});

const mapDispatchToProps = dispatch => ({
  onFiltersReset: () => dispatch(onFiltersReset()),
  onAgeFilterChange: data => dispatch(onAgeFilterChange(data)),
  onDistanceFilterChange: data => dispatch(onDistanceFilterChange(data)),
  onPriceFilterChange: data => dispatch(onPriceFilterChange(data)),
  onProFilterChange: () => dispatch(onProFilterChange()),
  onEhboFilterChange: () => dispatch(onEhboFilterChange()),
  onBabyFilterChange: () => dispatch(onBabyFilterChange()),
  onDriverFilterChange: () => dispatch(onDriverFilterChange()),
  filterAngels: (angels, defaultFilter, filters) =>
    dispatch(filterAngels(angels, defaultFilter, filters)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
