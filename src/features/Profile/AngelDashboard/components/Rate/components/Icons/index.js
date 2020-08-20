import React from 'react';

const Icons = ({ add, remove, disabled }) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>btn-check-off</title>
    <g fill="none" fillRule="evenodd">
      <rect
        fill={disabled ? '#D9D9D9' : '#68AEBF'}
        x="7"
        y="7"
        width="30"
        height="30"
        rx="15"
      />
      {add && (
        <path
          fill="#FFF"
          d="M22.791 20.73h4.828v1.618h-4.828v4.992h-1.629v-4.992h-4.805V20.73h4.805v-5.015h1.629z"
        />
      )}
      {remove && (
        <path
          transform="translate(7,7)"
          fill="#FFF"
          d="M20.62 13.73v1.618H9.356V13.73H15.791z"
        />
      )}
    </g>
  </svg>
);

export default Icons;
