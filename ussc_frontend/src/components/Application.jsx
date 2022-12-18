import Button from './Button';

export default function Application({ directionName, applicationId, role }) {
  const text =
    'Твоя заявка находится в рассмотрении. Теперь нужно дождаться, когда администратор проверит её и даст обратную связь, стаутс своей заявки ты можешь ослеживать здесь.';
  return (
    <div className='application'>
      <div className='application_content'>
        <div className='texts'>
          <div className='direction_info'>
            <h2>Разработка DATAPK</h2>
            <div className='role'>
              <span>Роль:</span>
              <span>тестировщик</span>
            </div>
          </div>
          <p className='status'>{text}</p>
        </div>
        <Button>Выполнить тестовое</Button>
      </div>
    </div>
  );
}
