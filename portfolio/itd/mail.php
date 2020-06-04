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
$services = $_POST['services'];
$speed = $_POST['speedinput'];
$aloc = $_POST['alocinput'];
$zloc = $_POST['zlocinput'];





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
'<br>Company: ' .$company. 
'<br>Phone ' .$phone. 
'<br>Email: ' .$email. 
'<br>Company`s Website: ' .$website. 
'<br><br>Services: ' .$services[0].', ' .$services[1].', ' .$services[2].', ' .$services[3].', ' .$services[4].', ' .$services[5].', ' .$services[6].', ' .$services[7].', ' .$services[8].', ' .$services[9].
'<br><br>Speed: ' .$speed. 
'<br>A Location: ' .$aloc. 
'<br>Z Location: ' .$zloc. 
'<br>Description: ' .$desc. 

$mail->AltBody = '';

if (!$mail->send()) { echo 'Error'; }
    else { header("Location: success.html"); }

?>
