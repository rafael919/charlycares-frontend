import anime from 'animejs';

export const slideIn = target => {
  return anime({
    targets: target,
    translateY: ['50%', '0%'],
    opacity: [0, 1],
    delay: 200,
    duration: 600,
    elasticity: 0,
    easing: 'easeInQuad',
  });
};

export const slideOut = (target, onComplete) => {
  return anime({
    targets: target,
    translateY: ['0%', '70%'],
    opacity: [1, 0],
    duration: 600,
    complete: onComplete,
    elasticity: 0,
    easing: 'easeOutQuad',
  });
};
