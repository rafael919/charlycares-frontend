import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Header } from 'semantic-ui-react';
import styled from 'styled-components';
import Layout from 'Components/Layout';
import ContentWrapper from 'Components/ContentWrapper';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Divider from 'Components/Divider';

import EarnPointHelpList from '../components/EarnPontHelpList';
import Points from '../components/PointBar';

import { getLoadingStatus, getErrors } from '../../../ui/selectors';
import { getAvailablePoints, getUserId } from '../selectors';

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem 1rem 0 1rem;
`;

const DescContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1rem;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${props => props.theme.lightGrey};
  text-align: left;
`;

class GetPointsHelp extends React.Component {
  state = {
    availablePoints: 0,
    earnPointHelpItems: [
      {
        id: 0,
        title: 'shop.earnPoint.referenceCheck.title',
        points: '400',
        desc: 'shop.earnPoint.referenceCheck.desc',
      },
      {
        id: 1,
        title: 'shop.earnPoint.updateCalander.title',
        points: '400',
        desc: 'shop.earnPoint.updateCalander.desc',
      },
      {
        id: 2,
        title: 'shop.earnPoint.acceptBookingMonth.title',
        points: '500',
        desc: 'shop.earnPoint.acceptBookingMonth.desc'
      },
      {
        id: 3,
        title: 'shop.earnPoint.fixedRequest.title',
        points: '700',
        desc: 'shop.earnPoint.fixedRequest.desc'
      },
      {
        id: 4,
        title: 'shop.earnPoint.lastMinuteBooking.title',
        points: '500',
        desc: 'shop.earnPoint.lastMinuteBooking.desc'
      },
      {
        id: 5,
        title: 'shop.earnPoint.uploadVideo.title',
        points: '400',
        desc: 'shop.earnPoint.uploadVideo.desc'
      },
      {
        id: 6,
        title: 'shop.earnPoint.acceptBooking.title',
        points: '200',
        desc: 'shop.earnPoint.acceptBooking.desc',
      },
      {
        id: 7,
        title: 'shop.earnPoint.addBooking.title',
        points: '300',
        desc: 'shop.earnPoint.addBooking.desc',
      },
      {
        id: 8,
        title: 'shop.earnPoint.updatePreferences.title',
        points: '300',
        desc: 'shop.earnPoint.updatePreferences.desc',
      },
      {
        id: 9,
        title: 'shop.earnPoint.updateFixedPreferences.title',
        points: '200',
        desc: 'shop.earnPoint.updateFixedPreferences.desc'
      },
      {
        id: 10,
        title: 'shop.earnPoint.jobFinder.title',
        points: '100',
        desc: 'shop.earnPoint.jobFinder.desc'
      },
      {
        id: 11,
        title: 'shop.earnPoint.fastResponse.title',
        points: '75',
        desc: 'shop.earnPoint.fastResponse.desc',
      },
      {
        id: 12,
        title: 'shop.earnPoint.newReview.title',
        points: '200',
        desc: 'shop.earnPoint.newReview.desc'
      },
      {
        id: 13,
        title: 'shop.earnPoint.setStandby.title',
        points: '100',
        desc: 'shop.earnPoint.setStandby.desc'
      }
    ],
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.availablePoints)
      this.setState({ availablePoints: nextProps.availablePoints });
  }

  render() {
    const { history } = this.props;
    const { earnPointHelpItems, availablePoints } = this.state;

    return (
      <Layout
        navBorder
        navTitle={<FormattedMessage id="shop.menu.getPoint" />}
        onNavBack={history.goBack}
      >
        <ContentWrapper>
          <CustomRow noPadding>
            <CustomColumn noPadding>
              <CustomColumn>
                <Points value={`${availablePoints}`} />
                <Divider />
                <TitleContainer>
                  <Header as="h4">
                    <FormattedMessage id="shop.earnPoint.help.title" />
                  </Header>
                </TitleContainer>
                <DescContainer>
                  <FormattedMessage id="shop.earnPoint.help.desc" />
                </DescContainer>
                <Divider />
                <EarnPointHelpList earnPointHelpItems={earnPointHelpItems} />
              </CustomColumn>
            </CustomColumn>
          </CustomRow>
        </ContentWrapper>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoadingStatus(state),
  errors: getErrors(state),
  userId: getUserId(state),
  availablePoints: getAvailablePoints(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetPointsHelp);
