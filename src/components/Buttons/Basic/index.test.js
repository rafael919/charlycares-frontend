import React from 'react';
import { shallow } from 'enzyme';
import CustomButton, { CButton } from './index';

describe('CustomButon', () => {
  it('Should render styled component', () => {
    let wrapper = shallow(<CustomButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render component without custom props', () => {
    let wrapper = shallow(<CButton fullWidth />);
    expect(wrapper).toMatchSnapshot();
  });
});
