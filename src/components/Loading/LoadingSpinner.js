import React from 'react';
import loadingSvg from '../../assets/images/loading.svg'
const LoadingSpinner = () => {
  return (
    <div style={{width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span>
        <img src={loadingSvg} alt="Loading Spinner"/>
      </span>
    </div>
  );
};

export default LoadingSpinner;