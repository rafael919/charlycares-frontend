import { css } from 'styled-components';

export default css`
  .fade-appear {
    opacity: 0;
    transform: translateX(-200px);
    z-index: 1;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(-200px);
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }

  .close-enter {
    opacity: 0.01;
    transform: translate3d(0, 100%, 0);
  }
  .close-enter.close-enter-active {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
    transition: all 600ms;
  }
  .close-exit {
    transform: translate3d(0, 0%, 0);
  }
  .close-exit.close-exit-active {
    transform: translate3d(0, 100vh, 0);
    transition: all 600ms;
  }
`;
