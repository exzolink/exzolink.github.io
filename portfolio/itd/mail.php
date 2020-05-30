<?php 


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$company = $_POST['company'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$website = $_POST['website'];
$desc = $_POST['description'];
$broadband = $_POST['Broadband'];
$ia = $_POST['InternetAccess'];
$bm = $_POST['BroadbandManagement'];
$it = $_POST['ITInfrastructure'];
$staff = $_POST['StaffAug'];
$mem = $_POST['MobileExpenseManagement'];
$other = $_POST['Other'];




//$mail->SMTPDebug = 3;                               // Enable verbose debug output

/*$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '123@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '123'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
*/
$mail->setFrom('exzolink@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('exzolink@gmail.com');
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']); 
$mail->isHTML(true);  




$mail->Subject = 'IT Diversity Form';
// $mail->Body    = '' .$nameCompany . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;

$mail->Body    = 'Name: ' .$name. 
'<br><br>Company: ' .$company. 
'<br><br>Phone ' .$phone. 
'<br><br>Email: ' .$email. 
'<br><br>Company`s Website: ' .$website. 
'<br><br>Description: ' .$desc. 
'<br><br>Broadband: ' .$broadband. 
'<br><br>Internet Access: ' .$ia. 
'<br><br>IT Infrastructure: ' .$it. 
'<br><br>Staff Augmentation: ' .$staff. 
'<br><br>Broadband Management: ' .$bm. 
'<br><br>Mobile Expense Management: ' .$mem. 
'<br><br>Other: ' .$other;

$mail->AltBody = '';

if (!$mail->send()) { echo 'Error'; }
    else { header("Location: success.html"); }

?>
