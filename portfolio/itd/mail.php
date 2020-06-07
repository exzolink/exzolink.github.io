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


$mail->isSMTP();                                    
$mail->Host = 'smtp.gmail.com';  					
$mail->SMTPAuth = true;                             
$mail->Username = 'exzolinksmtp@gmail.com'; 
$mail->Password = 'frostexzo1'; 
$mail->SMTPSecure = 'ssl';                
$mail->Port = 465;


$mail->setFrom('exzolinksmtp@gmail.com');
$mail->addAddress('J.Martino@ITDiversity.net');
$mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']); 
$mail->isHTML(true);  




$mail->Subject = 'IT Diversity Form';

$mail->Body    = 'Name: ' .$name. 
'<br>Company: ' .$company. 
'<br>Phone ' .$phone. 
'<br>Email: ' .$email. 
'<br>Company`s Website: ' .$website. 
'<br><br>Speed: ' .$speed. 
'<br>A Location: ' .$aloc. 
'<br>Z Location: ' .$zloc. 
'<br>Description: ' .$desc. 
'<br><br>Services: <br>' .$services[0].'<br>' .$services[1].'<br>' .$services[2].'<br>' .$services[3].'<br>' .$services[4].'<br>' .$services[5].'<br>' .$services[6].'<br>' .$services[7].'<br>' .$services[8].'<br> ' .$services[9].


$mail->AltBody = '';

if (!$mail->send()) { echo 'Error'; }
    else { header("Location: success.html"); }

?>
