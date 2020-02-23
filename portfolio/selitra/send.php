<?php
    $name = $_POST["user_name"];
    $phone = $_POST["user_phone"];
    $text_comment = $_POST["user_comment"];

        if ($name=="" or $phone=="" or $text_comment==""){ 
            echo "Заполните<br>все поля";
        }

        else{
        $to = "selitra.biz.ua@gmail.com";
        $subject = "Заказ звонка Селiтра";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "From: <selitra.biz.ua@gmail.com>\r\n";
        $message .= "Имя пользователя: ".$name."<br>";
        $message .= "Телефон: ".$phone."<br>";
        $message .= "Сообщение: ".$text_comment."<br>";
        $send = mail($to, $subject, $message, $headers);
        echo "Спасибо за Ваше сообщение";
        }
?>