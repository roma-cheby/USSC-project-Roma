import React from 'react';
import Button from '../components/Button';
import FileField from '../components/FileField';
import GoBackButton from '../components/GoBackButton';
import TaskDescription from '../components/TaskDescription';

const text = `Тестовое задание (название)

Формулировка тестового задания

(Текст формулировки)
Необходимо развернуть веб-сайт:
•	Nginx
•	Php-fpm
•	Содержимое index.php
<?php echo 'Hello World'; ?>
Для разверnывания использовать docker
Сайт разворачивается на чисто установленном образе linux ubuntu (minimal)

Результаты выполнения задания

(Текст результата)
Архивный файл, 
содержащий инструкцию по установке 
и архив с необходимыми конфигами.

Пояснения

(Текст пояснения)
 - Чем меньше архив с результатом и короче инструкция, тем выше оценка.
 - Сервер для разворачивания имеет выход в интернет.

`;

const TaskPage = () => {
  return (
    <div className='taskpage_wrapper'>
      <div className='task'>
        <GoBackButton style={{ marginBottom: '43px' }} />
        <TaskDescription text={text} />
      </div>
      <div className='task_submission'>
        <p className='info_text' style={{ marginBottom: '43px' }}>
          Срок сдачи:...
        </p>
        <FileField title='Прикрепить ответ на задание' />
        <p className='info_text' style={{ marginTop: '15px' }}>
          Добавить файл в формате .zip
        </p>
        <Button style={{ marginTop: '40px' }}>Отправить</Button>
      </div>
    </div>
  );
};

export default TaskPage;
