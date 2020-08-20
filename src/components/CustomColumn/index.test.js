import React from 'react';
import { shallow } from 'enzyme';
import CustomColumn, { CColumn } from './index';

describe('CustomColumn', () => {
  it('Should render styled component', () => {
    let wrapper = shallow(<CustomColumn />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render component without custom props', () => {
    let wrapper = shallow(<CColumn noPadding padding="20px" />);
    expect(wrapper).toMatchSnapshot();
  });
});
