import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import CustomRow from 'Components/CustomRow';
import Layout from 'Components/Layout';
import React, { Component } from 'react';
import Divider from 'Components/Divider';
import Confirmation from 'Components/Confirmation'; 

import Angel from './components/Angel'; 
import RatingSection from './components/RatingSection'; 
import ThankYou from './components/ThankYou'; 

import API from './api.js'; 

export default class AngelReference extends Component {
  static defaultProps = {
    allowedRoles: [],
  };

  state = {
  	ratings: [], 
  	review: '',
  };

  componentDidMount() {
  	API.getAngelData(this.props.match.params.angelId)
  		.then((resp) => {
  			this.setState({
  				angelName: resp.data.first_name, 
  				angelImage: resp.data.image
  			}); 
  		})
  }
  onGoToMembership = () => {
    this.props.history.push('/how-it-works');
  };

  setRating = (index, data) => {
  	let ratings = this.state.ratings; 
  	ratings[index] = data.rating; 
  	this.setState({
  		ratings: ratings
  	}, () => {
  		this.checkIfCompleted(); 
  	})
  };

  onReviewChange = (e) => {
  	this.setState({
  		review: e.target.value
  	}, () => {
  		this.checkIfCompleted(); 
  	})
  };

  checkIfCompleted = () => {
  	if(this.state.ratings.length === 5 && this.state.review.length > 0) {
  		this.setState({
  			completed: true
  		})
  	} 
  }

  onSendReview = () => {
  	const data = {
  		reference_id: this.props.match.params.referenceId, 
  		angel_id: this.props.match.params.angelId,
  		stars: this.state.ratings,
  		review: this.state.review
  	}; 
  	console.log(this.props.match); 
  	API.sendReview(data)
  		.then((resp) => {
  			this.setState({
          showThankYou: true
        });
  		})
  }

  render() {
    return (
    	<Layout
        navBorder
        navTitle={<FormattedMessage id="angelReference.header" />}
      >
      {!this.state.showThankYou ? <CustomRow>
      	<Angel 
	      	firstName={this.state.angelName}
	      	image={this.state.angelImage}
	      />
		    <Divider />
		    <RatingSection 
		    	setRating={this.setRating}
		    	onReviewChange={this.onReviewChange}
		    /> 
		    <Confirmation> 
		    	<BasicButton primary disabled={!this.state.completed} onClick={this.onSendReview}> 
		    		<FormattedMessage id="angelReference.confirm" />
		    	</BasicButton>
		    </Confirmation> 
		  </CustomRow> : 
      <CustomRow> 
        <ThankYou /> 
      </CustomRow>}
	    </Layout>
    );
  }
}
