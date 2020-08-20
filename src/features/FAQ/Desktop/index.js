import { connect } from 'react-redux';
import DesktopAppLayout from 'Components/DesktopAppLayout';
import Loader from 'Components/Loader';
import DesktopError from 'Components/DesktopError';
import React, { PureComponent } from 'react';

import { getErrors, getLoadingStatus } from '../../../ui/selectors';
import { getFAQs } from '../selectors';
import { getUserRole } from '../../../data/auth/selectors';
import { onErrorConfirm } from '../../../ui/actions';
import { onGetFAQs } from '../actions';
import Tab from '../components/Tab/All';
import Tabs from '../components/Tabs';

class FAQ extends PureComponent {
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
      <DesktopAppLayout>
        <DesktopError
          errors={this.props.errors}
          onRetry={this.props.onGetFAQs}
        />

        <DesktopAppLayout.LeftColumn withScroll isWhite={false}>
          {this.props.isLoading ? <Loader /> : null}
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
        </DesktopAppLayout.LeftColumn>
        <DesktopAppLayout.RightColumn isWhite={false} />
      </DesktopAppLayout>
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
