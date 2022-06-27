<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$title = $_POST['title'];
	$comment = $_POST['comment'];


	$name = htmlspecialchars($name);
	$email = htmlspecialchars($email);
	$title = htmlspecialchars($title);
	$comment = htmlspecialchars($comment);
	
	$name = urldecode($name);
	$email = urldecode($email);
	$title = urldecode($title);
	$comment = urldecode($comment);

	$name = trim($name);
	$email = trim($email);
	$title = trim($title);
	$comment = trim($comment);

	if (mail("nekitgraviton2002@gmail.com", 
			 "Новое письмо с сайта",
			 "Имя: ".$name."\n".
			 "Email: ".$email."\n".
			 "Тема: ".$title."\n".
			 "Комментарий: ".$comment."\n",
			"Content-type:text/plain; charset = UTF-8")
			
			) {
		echo ('Письмо успешно отправлено!');
	}
	else{
		echo ('Есть ошибки! Проверьте данные...');
	}

// 	$send = mail("nekitgraviton2002@gmail.com",
// 				 $name, $email, $title, $comment, "Content-type:text/plain; charset = UTF-8\r\nFrom:$email");

// 	if ($send == 'true') {echo "Сообщение отправлено";}
// // Если письмо не ушло — выводим сообщение об ошибке
// else {echo "Ой, что-то пошло не так";}
?>