import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { getFormattedChildrenAge } from 'Utils'; 
import ChildIcon from 'Assets/icons/child.svg'; 

const Kids = ({ kids }) => {
  let childrenArr = Object.keys(kids).map(function(key) {
    return {date: kids[key], key: key};
  });
  return (
    <Container>
      <Header>
        <FormattedMessage id="families.kids" />
      </Header>
    	{childrenArr.map((child, i) => {
    		let childAge = getFormattedChildrenAge(child.date); 
    		return (
    			<Birthdate> 
      		<ChildImage src={ChildIcon} />
      			<BirthdateText> 
	      			<FormattedMessage
	              id="childAge"
	              values={{
	                years: childAge.years,
	                months: childAge.months,
	              }}
	            />
	          </BirthdateText> 
          </Birthdate> 
        )
      })}
    </Container>
  );
};

const BirthdateText = styled.div`
	display: inline-flex; 
	vertical-align: super; 
`; 
const ChildImage = styled.img`
  &&& {
    width: 26px;
    margin-right: 0.6875rem;
  }
`;

const Header = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Birthdate = styled.text`
  display: inline-block;
  margin-top: 0.875rem; 
`;
const Container = styled.div`
  padding: 1rem 0;
  display: inline-grid; 
`;

export default Kids;
