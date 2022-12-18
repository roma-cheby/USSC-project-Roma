import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { getAllApplications } from '../store/slices/allApplicationsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../store/slices/allUsersSlice';

export default function Table({ type, user, applications }) {
  switch (type) {
    case 'applications':
      return <ApplicationsTable />;
    case 'interns_test_cases':
      return <InternsTestCases />;
    case 'contacts':
      return <ContactsTable user={user} />;
    case 'education':
      return <EducationTable user={user} />;
    case 'profile_application':
      return <ProfileApplicationTable applications={applications} />;
    default:
      throw new Error('Incorrect Table type');
  }
}

function ApplicationsTable() {
  const dispatch = useDispatch();

  const applications = useSelector(
    (state) => state.allApplications.allApplications
  );
  const users = useSelector((state) => state.allUsers.users);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllApplications());
  }, []);

  return (
    <div className='table'>
      <TableHeader type='applications' />
      {applications.length && users.length ? (
        applications.map((app, index) => {
          const userIndex = users.findIndex((user) => {
            return app.userId === user.id;
          });

          if (userIndex === -1) return;

          const fullName = `${users[userIndex].profile.secondName} ${users[userIndex].profile.firstName} ${users[userIndex].profile.patronymic}`;

          const unverifiedAppsCount = users[userIndex].applications.filter(
            (application) => application.allow === null
          ).length;

          return (
            <TableRow
              key={index}
              type='applications'
              fullName={fullName}
              unverifiedAppsCount={unverifiedAppsCount}
              href={`/admin/application/${users[userIndex].id}`}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

function ContactsTable({ user }) {
  return (
    <div className='table'>
      <TableRow
        type='contacts'
        contactType='phone'
        value={user?.profile?.phone}
      />
      <TableRow type='contacts' contactType='email' value={user?.email} />
      <TableRow
        type='contacts'
        contactType='telegram'
        value={user?.profile?.telegram}
      />
    </div>
  );
}

function EducationTable({ user }) {
  return (
    <div className='table'>
      <TableRow
        type='education'
        contentType='university'
        value={user?.profile?.university}
      />
      <TableRow type='education' contentType='faculty' value='ИРИТ-РТФ' />
      <TableRow
        type='education'
        contentType='speciality'
        value={user?.profile?.speciality}
      />
      <TableRow
        type='education'
        contentType='course'
        value={user?.profile?.course}
      />
      <TableRow
        type='education'
        contentType='workExperience'
        value={user?.profile?.workExperience}
      />
    </div>
  );
}

function ProfileApplicationTable({ applications }) {
  const getVerboseStatus = (status) => {
    switch (status) {
      case null:
        return 'В рассмотрении';
      case true:
        return 'Одобрено';
      case false:
        return 'Отклонено';
      default:
        return 'В рассмотрении';
    }
  };

  return (
    <div className='table'>
      <TableHeader type='profile_application' />

      {applications?.map((app) => {
        return (
          <TableRow
            key={app?.id || 'null'}
            type='profile_application'
            directionName={app?.title}
            role={app?.role}
            date=''
            status={getVerboseStatus(app?.status)}
          />
        );
      })}
    </div>
  );
}

function InternsTestCases() {}
