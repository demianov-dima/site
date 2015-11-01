<?php
//отвечаем только на AJAX запросы
//script by http://modx.ws/urok-modx-ajax-forma
if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' && filter_input(INPUT_POST, 'task') == 'sendOrder')
{
  //получаем значение ИД, при неправильном запросе - выход
  //фильтруем остальные данные получаемые в запросе
  $action = filter_input(INPUT_POST, 'action' );
  $name = filter_input(INPUT_POST, 'name' );
  $tel = filter_input(INPUT_POST, 'tel' );

  if(!empty($action) && !empty($name) && !empty($tel))
  {
	//получаем системную настройку emailsender для получателя сообщений
	$recepient = $modx->getConfig('emailsender');
	//инициализируем modSwiftMailer и отправляем сообщение на почту
	$modx->getService('mail', 'mail.modSwiftMailer');
	$modx->mail->address('to', $recepient, 'Recepient');
	$modx->mail->address('sender', 'robot@stroyka495.ru', $name);
	$modx->mail->subject('Новая заявка');
	//хтмл-код самого сообщения с данными
	$modx->mail->body("<h2>{$name}</h2> сделал запрос на услугу <b>{$action}</b>. Перезвоните ему, пожалуйста, по номеру <b>{$tel}</b>");
	if($modx->mail->send()) 
	{
	  echo '<p>Ваша заявка успешно принята<br>Мы свяжемся с вами как можно скорее</p>';
	}
	else
	{
		echo '<p>Произошла ошибка, пожалуйста, попробуйте позже</p>';
	}
	$modx->mail->reset();
  }
  else
  {
	$msg = '<ul>';

	if(!$action) 
	{
	  $msg .= '<li>Поле "Вид услуги" не заполнено</li>';
	}

	if(!$name)  
	{
	  $msg .= '<li>Поле "Имя" не заполнено</li>';
	}

	if(!$tel)  
	{
	  $msg .= '<li>Поле "Телефон" не заполнено</li>';
	}

	$msg .= '</ul>';

	echo $msg;
  }
  exit();
}
return;
