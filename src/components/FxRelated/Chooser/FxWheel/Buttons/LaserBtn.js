import React, { useContext } from 'react';
import { FxContext } from '../../../../../context/FxContext';

const LaserBtn = ({ id }) => {
  const { activeFx, setActiveFx } = useContext(FxContext);
  return (
    <button
      className={(id === activeFx ? 'apply' : '') + ' fx-button'}
      onMouseDown={() => setActiveFx(id)}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 469.87 445.9'>
        <path d='M235,0c-1.77.06-3.55.13-5.34.22l-13,3.47,16.06,59.94-41.53,5.15L174.22,5.65A538.24,538.24,0,0,0,114.41,18,184.34,184.34,0,0,0,53.6,46.65a29.31,29.31,0,1,0-39,41.79C1.3,110.78-3.26,135.07,2.94,158.25c7.43,27.71,29,49.11,59.1,61.35a141.08,141.08,0,0,0,14.62,5C4.85,308.7-4.65,475.94,139.57,441.22a31.33,31.33,0,0,1,2.78-59.62,31.34,31.34,0,0,1,5.06-51.44,31.41,31.41,0,0,1,7-48.91l.13-1.53a31.34,31.34,0,0,1,.87-52.5c4.71-.89,9.44-1.95,14.19-3.22.39-.1.79-.24,1.19-.34,1-.28,2.08-.59,3.12-.88,9,47.5,36.06,68.62,59.47,53-21.67-19-29.08-40.42-29.75-62.28,8-2.77,16-5.74,23.87-8.9l-19.62-73.29,38.94-14.87,18.43,68.84L276,182.38c2.3-1.19,4.61-2.38,6.88-3.6l-18.53-69.06,39-14.87,15.59,58.22,10.81-2.88c2.21-1.55,4.4-3.09,6.53-4.66l-15.37-57.4,37.47-14.32,11.5,42.94.5-.12a175.37,175.37,0,0,0,14.44-16.32l-8.88-33.18,12.28-4.69,15.88-4.25a34.79,34.79,0,1,0,29-50.57,35.77,35.77,0,0,0-7,1.16,34.65,34.65,0,0,0-25.72,31L379.6,45.37l-9.22,1.16-7.94-29.69a169,169,0,0,0-19.18-6.59l-1.82.47,10.22,38.15-40,4.94L297.79,1.87q-2.85-.3-5.75-.56L279.19,4.72,293,56.16l-41.59,5.12L235,0Z' />
      </svg>
    </button>
  );
};

export default LaserBtn;
