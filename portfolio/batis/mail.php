<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['email'];
$phone = $_POST['phone'];


$mail->isSMTP();                                    
$mail->Host = 'smtp.gmail.com';  					
$mail->SMTPAuth = true;                             
$mail->Username = 'batismassive@gmail.com'; 
$mail->Password = 'batismassive2020!'; 
$mail->SMTPSecure = 'ssl';                
$mail->Port = 465;


$mail->setFrom('batismassive@gmail.com');
$mail->addAddress('exzolink@gmail.com');
$mail->isHTML(true);  


$mail->Subject = 'Заказ освещения';

$mail->Body    = 'Имя: ' .$name. 
'<br>Телефон: ' .$phone.

$mail->AltBody = '';

if (!$mail->send()) { echo 'Error'; }
    else { header("Location: success.html"); }
?>
