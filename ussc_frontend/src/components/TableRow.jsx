export default function TableRow({ type, ...props }) {
  switch (type) {
    case 'applications':
      return <ApplicationRow {...props} />;
    case 'contacts':
      return <ContactRow {...props} />;
    case 'education':
      return <EducationRow {...props} />;
    case 'profile_application':
      return <ProfileApplicationRow {...props} />;
    default:
      throw new Error('Incorrect TableRow type');
  }

  return (
    <a href=''>
      <div className='row'>
        <span>Ахидов Роман Игоревич</span>
        <span>23.05.2023</span>
        <span>2</span>
      </div>
    </a>
  );
}

function ApplicationRow({ fullName, firstAppDate, unverifiedAppsCount, href }) {
  return (
    <a href={href}>
      <div className='row'>
        <span>{fullName}</span>
        <span>{firstAppDate}</span>
        <span>{unverifiedAppsCount}</span>
      </div>
    </a>
  );
}

function ContactRow({ contactType, value }) {
  switch (contactType) {
    case 'phone':
      return (
        <>
          <span>Телефон</span>
          <span>{value}</span>
        </>
      );
    case 'email':
      return (
        <>
          <span>E-mail</span>
          <span>{value}</span>
        </>
      );
    case 'telegram':
      return (
        <>
          <span>Ник в Telegram</span>
          <span>{value}</span>
        </>
      );
    default:
      throw new Error('Incorrect Contact type in ContactRow');
  }
}
function EducationRow({ contentType, value }) {
  switch (contentType) {
    case 'university':
      return (
        <>
          <span>Учебное заведение</span>
          <span>{value}</span>
        </>
      );
    case 'faculty':
      return (
        <>
          <span>Факультет</span>
          <span>{value}</span>
        </>
      );
    case 'speciality':
      return (
        <>
          <span>Специальность</span>
          <span>{value}</span>
        </>
      );
    case 'course':
      return (
        <>
          <span>Курс</span>
          <span>{value}</span>
        </>
      );
    case 'workExperience':
      return (
        <>
          <span>Опыт работы</span>
          <span>{value}</span>
        </>
      );
    default:
      throw new Error('Incorrect Contact type in ContactRow');
  }
}

function ProfileApplicationRow({ directionName, role, date, status }) {
  return (
    <div className='row'>
      <span>{directionName}</span>
      <span>{role}</span>
      <span>{date}</span>
      <span>{status}</span>
    </div>
  );
}
