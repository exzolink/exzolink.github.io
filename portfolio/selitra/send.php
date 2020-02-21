<?php
    $name = $_POST["user_name"];
    $phone = $_POST["user_phone"];
    $text_comment = $_POST["user_comment"];

        $to = "selitra.biz.ua@gmail.com";
        $subject = "Письмо с обратной связи";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "From: <selitra.biz.ua@gmail.com>\r\n";
        $message .= "Имя пользователя: ".$name."\n";
        $message .= "Телефон: ".$phone."\n";
        $message .= "Сообщение: ".$text_comment."\n";
        $send = mail($to, $subject, $message, $headers);
?>