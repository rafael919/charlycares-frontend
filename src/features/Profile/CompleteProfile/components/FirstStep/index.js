import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Header } from 'semantic-ui-react';

import DogIcon from 'Assets/icons/icn-feature-dog.svg';
import CatIcon from 'Assets/icons/icn-feature-cat.svg';
import addIcon from 'Assets/icons/btn-check-off.svg';
import checkIcon from 'Assets/icons/btn-check-on.svg';

	const Container = styled.div`

	`;

	const DescHeadingContainer = styled.div`
	  position: relative;
	  padding-bottom: 1rem;
	`;

	const DescContainer = styled.div`
	  padding: 1rem 0;
	`;

	const Desc = styled.textarea.attrs({
	  rows: 3,
	})`
	  width: 100%;
	  font-size: 0.9375rem;
	  line-height: 1.6;
	  border: 0;
	  background: white; 

	  &:focus {
	    outline: 0;
	  }

	  ::placeholder {
	    font-weight: 300;
	    color: ${props => props.theme.lightGrey};
	    font-style: italic;
	  }
	`;

	const Name = styled.div`
	  font-size: 0.9375rem;
	  flex: 1;
	  text-align: left;
	`;

	const AnimalIcon = styled.img`
	  width: 1.5rem;
	  height: 1.5rem;
	  vertical-align: middle;
	  margin-right: 1rem;
	`

	const Pet = styled.div`
		display: inline-block;
		line-height: 44px;
		width: 100%;
	`
	const Button = styled.div`
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  text-align: center;
  &:focus {
    outline: 0;
  }
  display: inline-block;
  float: right;
`;

	const PetsContainer = styled.div`

	`

	const Icon = styled.img`
	  width: 40px;
	  height: 40px;
	`;

	class FirstStep extends React.PureComponent {
		render() {
			const { short_bio, cat, dog, intl, onDescChange, onToggleDog, onToggleCat } = this.props;
			return(
				<Container> 
					<Header>
						<FormattedMessage id="profile.family.complete.firstStep.desc" />
					</Header>
	          <DescContainer>
		          <DescHeadingContainer>
		            <Name>
		              <FormattedMessage id="profile.family.edit.desc" />
		            </Name>
		          </DescHeadingContainer>
		          <Desc
		            onChange={onDescChange}
		            placeholder={intl.formatMessage({
		              id: 'profile.family.edit.descPlaceholder',
		            })}
		            value={short_bio}
		          />
		        </DescContainer>
		        <PetsContainer>
							<Pet>
			          <AnimalIcon src={DogIcon} />
			          <FormattedMessage id="angel.preferences.animals1" />
				        <Button onClick={onToggleDog}>
				          <Icon src={dog ? checkIcon : addIcon} />
				        </Button>  
			        </Pet>
							<Pet>
			          <AnimalIcon src={CatIcon} />
			          <FormattedMessage id="angel.preferences.animals2" />
				        <Button onClick={onToggleCat}>
				          <Icon src={cat ? checkIcon : addIcon} />
				        </Button>  
			        </Pet>
		        </PetsContainer>
				</Container>
			);	
		};
	};

	export default injectIntl(FirstStep);
