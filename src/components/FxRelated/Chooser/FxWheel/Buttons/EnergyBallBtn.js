import React, { useContext } from 'react';
import { FxContext } from '../../../../../context/FxContext';

const EnergyBallBtn = ({ id }) => {
  const { activeFx, setActiveFx } = useContext(FxContext);
  return (
    <button
      className={(id === activeFx ? 'apply' : '') + ' fx-button'}
      onMouseDown={() => setActiveFx(id)}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 466.48 474.58'>
        <path d='M253.87,0c-20.3,83.17-71.2,93.14-116.58,21.18,22.31,81.62-20,117.14-95.95,75.74C104.28,157.44,87.53,208.28,0,210.9c82.15,20.54,93.91,74.44,22.85,120.37,82.17-22.88,115.24,21,70.12,101,62.48-70.69,116.49-53.2,116.87,42.28,19.08-92.26,71.63-104,118.93-23.13-27.22-87.47,16.35-125.63,96.38-80.07-66.4-61.84-50.33-112.95,41.33-114-87.13-20.14-96.73-77.18-18.14-124.28-88.48,29.4-125-11.35-79.52-93.23C309,103.61,256.44,88.6,253.87,0ZM247,73.57l28.68,33.51c2.66.9,5.29,1.88,7.91,3l43.5-8.12,8.48,45.5c1,1.13,2,2.28,2.89,3.44v0l43.83,15.47-15.48,43.88-.42-.14c.33,1.61.64,3.22.91,4.84l.37-.32,30.14,35.21-35.09,30q-.78,2.47-1.67,4.91l8.42,45.17-43.07,8-4.21,4.2-.33-.33-2.13,1.81L305.09,385,266.2,371.28q-6.81,1.79-13.74,2.88l-30.9,26.45-24.87-29.05a139.2,139.2,0,0,1-18.22-6l-36.94,6.89L134.92,337l-1.53-1.48a139.91,139.91,0,0,1-13.68-15.93L86.33,307.81,98,274.76a138.85,138.85,0,0,1-4.36-23.6L70.74,224.42l27.18-23.27a137.48,137.48,0,0,1,7.63-21l-6.7-35.92,37.56-7a136.65,136.65,0,0,1,14.25-11.73L163.5,89.1l38.74,13.67q6.51-1.38,13.1-2.13L247,73.57Zm-15.87,44.74a119.7,119.7,0,0,0-118,100.63l76.75,10.8,11.58-45.63,43.16,4.8-10.44-70.55c-1,0-2,0-3,0Zm22.24,2.09L263.78,191l41.37,4.6L264,255,338,291.26A119.62,119.62,0,0,0,253.33,120.4Zm-37.81,84.09-11.7,46.1-92.25-13A119.65,119.65,0,0,0,229.68,357.33l-19.24-57.72L272,210.76l-56.43-6.27Zm37.75,66.08-22.14,32L248.94,356a119.83,119.83,0,0,0,79.32-48.68l-75-36.75Z' />
      </svg>
    </button>
  );
};

export default EnergyBallBtn;