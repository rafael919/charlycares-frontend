import React from 'react';
import anime from 'animejs';
import Logo from 'Assets/images/logo.png';
import Heading from '../Heading'; 
import TimeDesc from '../TimeDesc'; 
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment'; 
import { FormattedMessage } from 'react-intl';

class Timer extends React.PureComponent {
  outerCircle = React.createRef();

  componentDidMount() {
    this.animateOuterCircle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.stopped) {
      this.circleTimeline.restart();
      this.circleTimeline.pause();
    }
  }

  animateOuterCircle = () => {
    this.circleTimeline = anime.timeline({
      loop: true,
    });
    this.circleTimeline
      .add({
        targets: this.outerCircle.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000,
      })
      .add({
        targets: this.outerCircle.current,
        strokeDashoffset: [
          0,
          -this.outerCircle.current.getAttribute('stroke-dasharray'),
        ],
        easing: 'easeInOutSine',
        duration: 1000,
      });
  };

  renderTimeLeft = () => {
    console.log('go here'); 
    const endMoment = moment(this.props.suspendedUntil, 'YYYY-MM-DD HH:mm:ss'); 
    const hours = endMoment.diff(moment(), 'hours')
    const mins = Math.floor(endMoment.diff(moment(), 'minutes') % 60); 
    return (
      <FormattedMessage
        id="suspended.timeLeft"
        values={{ hours: hours, minutes: mins }}
      />
    );
  }

  render() {
    console.log(this.props); 
    return (
      <Container> 
        <Explanation> 
          <TimeDesc>
            <FormattedMessage id="suspended.anotherHours" />
          </TimeDesc>
          <Heading> 
            {this.renderTimeLeft()}
          </Heading>
        </Explanation> 
        <div style={{position: 'relative'}}> 
        <svg
          width="75"
          height="75"
          viewBox="-3 -5 75 75"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <circle
              ref={this.outerCircle}
              transform="translate(-1 -12) rotate(-90 37.5 37.5)"
              stroke="#C7C7C9"
              strokeWidth="4"
              cx="32"
              cy="32"
              r="32"
            />
          </g>
        </svg>
        <Image style={{position: 'absolute', left: '5px', top: '7px', width: '58px', height: '58px'}} src={Logo}/> 
        </div> 
      </Container> 
    );
  }
}

const Explanation = styled.div`
  width: 70%; 
`;

const Container = styled.div`
  border-radius: 0.4rem; 
  width: 100%; 
  background-color: ${props => props.theme.defaultGrey}; 
  padding: 0.8rem; 
  height: 6rem; 
  display: inline-flex; 
`;
export default Timer;
