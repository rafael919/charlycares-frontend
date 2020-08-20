import { FormattedMessage } from 'react-intl';
import BasicButton from 'Components/Buttons/Basic';
import DesktopWelcomeLayout from 'Components/DesktopWelcomeLayout'; 
import styled from 'styled-components';

import ThankYou from '../components/ThankYou'; 
import Divider from 'Components/Divider'; 
import React, { Component } from 'react';
import Angel from '../components/Angel'; 
import RatingSection from '../components/RatingSection'; 

import API from '../api.js';

const Container = styled.div`
  width: 70%; 
  align-content: left; 
  text-align: left; 
  margin-top: 8rem; 
  padding-left: 6rem; 
  margin-bottom: 4rem; 
`
export default class AngelReference extends Component {
  static defaultProps = {
    allowedRoles: [],
  };

  state = {
    ratings: [], 
    review: ''
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
    
    API.sendReview(data)
      .then((resp) => {
        this.setState({
          showThankYou: true
        })
      })
  }

  render() {
    return (
      <DesktopWelcomeLayout withLogo>
        {!this.state.showThankYou ? <Container> 
          <Angel 
            firstName={this.state.angelName}
            image={this.state.angelImage}
          />
          <Divider />
          <RatingSection 
            setRating={this.setRating}
            onReviewChange={this.onReviewChange}
          /> 
          <BasicButton primary disabled={!this.state.completed} onClick={this.onSendReview}> 
            <FormattedMessage id="angelReference.confirm" />
          </BasicButton>
        </Container> : 
        <Container> 
          <ThankYou />
        </Container>}
      </DesktopWelcomeLayout> 
    );
  }
}
