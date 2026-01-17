<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "marxphase@gmail.com";
$subject = "Website Contact Form";
$headers = "From: $email";

mail($to, $subject, $message, $headers);
header("Location: contact.html?success=true");
?>