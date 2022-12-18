import React from 'react';
import FillProfileRequest from '../components/FillProfileRequest';
import { useProfile } from '../hooks/use-profile';
import DirectionsGrid from '../components/DirectionsGrid';

const DirectionsPage = () => {
  const [_, isFilledProfile] = useProfile();

  return (
    <div className='main'>
      <div className='directionspage_content'>
        {isFilledProfile() ? (
          <></>
        ) : (
          <FillProfileRequest style={{ marginTop: '109px' }} />
        )}
        <div className='content_section'>
          <h2 className='section_heading'>Направления подготовки</h2>
          <DirectionsGrid />
        </div>
      </div>
    </div>
  );
};

export default DirectionsPage;
