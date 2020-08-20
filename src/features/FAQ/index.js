import { connect } from 'react-redux';
import { FamilyTabBar, AngelTabBar } from 'Components/NavigationTabs';
import { FormattedMessage } from 'react-intl';
import CustomColumn from 'Components/CustomColumn';
import CustomRow from 'Components/CustomRow';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import Layout from 'Components/Layout';
import React, { Component } from 'react';

import { getErrors, getLoadingStatus } from '../../ui/selectors';
import { getFAQs } from './selectors';
import { getUserRole } from '../../data/auth/selectors';
import { onErrorConfirm } from '../../ui/actions';
import { onGetFAQs } from './actions';
import Tab from './components/Tab/All';
import Tabs from './components/Tabs';

class FAQ extends Component {
  componentDidMount() {
    this.props.onGetFAQs();
  }

  filterFaqs = (faqs, title) => faqs.filter(faq => faq.title === title);

  createTabBar = () => {
    return this.props.faqs.map((item, i) => {
      if (item.title !== null) {
        const faqs = this.filterFaqs(this.props.faqs, item.title);
        return {
          menuItem: item.title,
          render: () => <Tab faqs={faqs} />,
        };
      }
      return null;
    });
  };

  render() {
    return (
      <Layout
        backgroundColor="#f8f7f8"
        onNavBack={this.props.history.goBack}
        navTitle={<FormattedMessage id="support" />}
        centered
        navBorder
        role="main"
      >
        <Error errors={this.props.errors} onRetry={this.props.onGetFAQs} />
        {this.props.isLoading ? <Loader /> : null}

        <CustomRow noPadding>
          <CustomColumn noPadding width={16}>
            {this.props.faqs && this.props.faqs.length ? (
              <Tabs
                menu={{
                  secondary: true,
                  pointing: true,
                  aligned: 'center',
                }}
                panes={this.createTabBar()}
              />
            ) : null}
          </CustomColumn>
        </CustomRow>
        {this.props.role === 'angel' ? <AngelTabBar /> : <FamilyTabBar />}
      </Layout>
    );
  }
}

export default connect(
  state => ({
    faqs: getFAQs(state),
    isLoading: getLoadingStatus(state),
    errors: getErrors(state),
    role: getUserRole(state),
  }),
  {
    onErrorConfirm,
    onGetFAQs,
  }
)(FAQ);
