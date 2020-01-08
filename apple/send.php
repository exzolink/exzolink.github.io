<?php
$to = "abcservice.almaty@gmail.com";
$tema = "Заявка с сайта Apple Service";
  $message .= "E-mail: ".$_POST['email']."<br>";
$message .= "Номер телефона: ".$_POST['number']."<br>";
$message .= "Имя: ".$_POST['firstname']."<br>";
$message .= "Фамилия: ".$_POST['lastname']."<br>";
$headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$verify = mail($to, $tema, $message, $headers);
 if ($verify == 'true')
            {
                echo "<p>Сообщение отправлено";
                header("Location: http://apple-service.com.kz/");
            }
        else
            {
                echo "<p>Сообщение не отправлено";
                header("Location: http://apple-service.com.kz/");
            }    
?>