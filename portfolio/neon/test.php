<?php
$to = "test@gmail.com";
$topic = "Заявка с сайта";
$message .= "Имя: ".$_POST['name']."<br>";
$message .= "Почта: ".$_POST['email']."<br>";
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$send = mail($to, $topic, $message, $headers); 
?>