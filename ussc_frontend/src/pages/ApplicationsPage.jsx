import React, { useEffect } from 'react';
import Application from '../components/Application';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationsByUserId } from '../store/slices/applicationSlice';
import { useAuth } from '../hooks/use-auth';

const ApplicationsPage = () => {
  const user = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplicationsByUserId(user.id));
  });

  // const applications = useSelector((state) => state.applications.applications);

  return (
    <div className='main'>
      <div className='page_content'>
        <Application />
      </div>
    </div>
  );
};

export default ApplicationsPage;
