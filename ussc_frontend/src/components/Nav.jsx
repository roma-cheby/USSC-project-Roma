import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const Nav = () => {
  const isAuth = useAuth().isAuth;

  if (isAuth) {
    return (
      <div className='nav'>
        <Link to='/applications' className='nav_item'>
          Мои заявки
        </Link>
        <Link to='/directions' className='nav_item'>
          Направления подготовки
        </Link>
      </div>
    );
  }

  return (
    <div className='nav'>
      <a href='#about' className='nav_item'>
        О нас
      </a>
      <a href='#directions' className='nav_item'>
        Направления подготовки
      </a>
      <a href='#footer' className='nav_item'>
        Контакты
      </a>
    </div>
  );
};

export default Nav;
