<?php
$to = "exzolink@gmail.com";
$tema = "Заявка с сайта";
$message .= "Имя: ".$_POST['name']."<br>";
$message .= "Номер телефона: ".$_POST['email']."<br>";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$verify = mail($to, $tema, $message, $headers); 
?>