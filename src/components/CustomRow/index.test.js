import React from 'react';
import { shallow } from 'enzyme';
import CustomStyledRow, { CRow } from './index';

describe('CustomRow', () => {
  it('Should render styled component', () => {
    let wrapper = shallow(<CustomStyledRow />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render component without custom props', () => {
    let wrapper = shallow(<CRow noPadding padding="20px" />);
    expect(wrapper).toMatchSnapshot();
  });
});
