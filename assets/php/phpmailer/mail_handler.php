<?php
require_once('email_config.php');
require('PHPMailer/PHPMailerAutoload.php');
$message = [];
$output = [
    'success' => null,
    'messages' => []
];
//Sanitize name field
$message['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
if(empty($message['name'])){
    $output['success'] = false;
    $output['messages'][] = 'missing name key';
}
//Validate email field
// $message['email'] = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
// if(empty($message['email'])){
//     $output['success'] = false;
//     $output['messages'][] = 'invalid email key';
// }
//Sanitize Message
$message['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
if(empty($message['message'])){
    $output['success'] = false;
    $output['messages'][] = 'missing message key';
}
if ($output['success'] !== null) {
    http_response_code(400);
    // echo json_encode($output);
    exit();
}
// Set up email object
$mail = new PHPMailer;
$mail->SMTPDebug = 3;           // Enable verbose debug output. Change to 0 to disable debugging output.
$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication
$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->SMTPOptions = ($options);
// $mail->From = $message['email'];
$mail->FromName = $message['name'];   // sender's name (shows in "From" field)
$mail->addAddress(EMAIL_TO_ADDRESS, EMAIL_USERNAME);  // Add a recipient
//$mail->addAddress('ellen@example.com');                        // Name is optional
// $mail->addReplyTo($message['email'], $message['name']);                          // Add a reply-to address
$mail->addCC(EMAIL_TO_ALT_ADDRESS, EMAIL_USERNAME);
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
$message['subject'] = substr($message['message'], 0, 78);  // set subject to partial message
$currentDate = date('Y-M-D H:i:s');
$mail->Subject = "Received message from {$_POST['name']}";
$mail->Body    = "
<div>Name: {$_POST['name']}</div>
<div>Subject: {$_POST['subject']}</div>
<div>Message: {$_POST['message']}</div>";
$mail->AltBody = "
Name: {$_POST['name']}
Subject: {$_POST['subject']}
Message: {$_POST['message']}";
//Attempt email send
if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['success']= true;
}
// echo json_encode($output);
?>