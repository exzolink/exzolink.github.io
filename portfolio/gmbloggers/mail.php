<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['phone'];
$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];


$mail->isSMTP();                                    
$mail->Host = 'smtp.gmail.com';  					
$mail->SMTPAuth = true;                             
$mail->Username = 'gmbloggersSMTP@gmail.com'; 
$mail->Password = '2020GM20bloggers'; 
$mail->SMTPSecure = 'ssl';                
$mail->Port = 465;


$mail->setFrom('gmbloggersSMTP@gmail.com');
$mail->addAddress('info@gmbloggers.kz');
$mail->addAddress('zayavkaclient@yandex.ru');
$mail->isHTML(true);  


$mail->Subject = 'Заказ звонка с gm.bloggers';

$mail->Body    = 'Имя: ' .$name. 
'<br>Телефон: ' .$phone.
'<br><br>Source: ' .$utm_source.
'<br>Medium: ' .$utm_medium.
'<br>Campaign: ' .$utm_campaign.
'<br>Content: ' .$utm_content.
'<br>Term: ' .$utm_term.

$mail->AltBody = '';

if (!$mail->send()) { echo 'Error'; }
    else { header("Location: success.html"); }

?>
