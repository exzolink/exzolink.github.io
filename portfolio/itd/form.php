<?php

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

$to = "exzolink@gmail.com";
$subject = "IT Diversity Form";
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: <exzolink@gmail.com>\r\n";
$message .= "Name: ".$name."<br>";
$message .= "Company: ".$company."<br>";
$message .= "Phone: ".$phone."<br>";
$message .= "Email: ".$email."<br>";
$message .= "Company's Website: ".$website."<br>";
$message .= "Description: ".$desc."<br>";
$message .= "Broadband: ".$broadband."<br>";
$message .= "Internet Access: ".$ia."<br>";
$message .= "IT Infrastructure: ".$it."<br>";
$message .= "Staff Augmentation: ".$staff."<br>";
$message .= "Broadband Management: ".$bm."<br>";
$message .= "Mobile Expense Management: ".$mem."<br>";
$message .= "Other: ".$other."<br>";

$mail = mail($to, $subject, $message, $headers);
header("Location: /success.html")
?>