import React from 'react';
import anime from 'animejs';

class AnimatedCircle extends React.PureComponent {
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
        strokeDashoffset: function(el) {
          return [el.getAttribute('stroke-dasharray'), 0];
        },
        easing: 'easeInOutSine',
        duration: 1000,
      })
      .add({
        targets: this.outerCircle.current,
        strokeDashoffset: function(el) {
          return [0, -el.getAttribute('stroke-dasharray')];
        },
        easing: 'easeInOutSine',
        duration: 1000,
      });
  };

  render() {
    return (
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
            strokeDasharray="200.73715209960938"
            cx="32"
            cy="32"
            r="32"
          />

          <circle fill="#F56B87" cx="31" cy="31" r="29" />

          <text fontFamily=".AppleSystemUIFont" fontSize="15.84" fill="#FFF">
            <tspan x="14.658" y="35">
              {this.props.noText ? '' : 'Stop'}
            </tspan>
          </text>
        </g>
      </svg>
    );
  }
}

export default AnimatedCircle;
