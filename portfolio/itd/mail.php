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




//$mail->SMTPDebug = 3;                             

/*
$mail->isSMTP();                                    
$mail->Host = 'smtp.mail.ru';  					
$mail->SMTPAuth = true;                             
$mail->Username = '123@mail.ru'; 
$mail->Password = '123'; 
$mail->SMTPSecure = 'ssl';                
$mail->Port = 465;
*/

$mail->setFrom('J.Martino@ITDiversity.net');
$mail->addAddress('J.Martino@ITDiversity.net');
$mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']); 
$mail->isHTML(true);  




$mail->Subject = 'IT Diversity Form';

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
'<br><br>Mobile Expense Management (empty means not checked): ' .$mem. 
'<br><br>Other: ' .$other;

$mail->AltBody = '';

if (!$mail->send()) { echo 'Error'; }
    else { header("Location: success.html"); }

?>
