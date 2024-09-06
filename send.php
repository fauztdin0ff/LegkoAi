<?php
$telegramToken = '7475905156:AAEmo8rBJ3zE9wZN-oCkPVUbP_IWXyrOwZE';
$chatId = '-4252938574';

$name = htmlspecialchars($_POST['name']);
$telephone = htmlspecialchars($_POST['telephone']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

$text = "Заявка с Legko.ai\n";
$text .= "Имя: $name\n";
$text .= "Телефон: $telephone\n";
$text .= "Email: $email\n";
$text .= "Комментарий: $message";

$sendToTelegram = fopen("https://api.telegram.org/bot$telegramToken/sendMessage?chat_id=$chatId&text=" . urlencode($text), "r");

if ($sendToTelegram) {
   header('Location: ' . $_SERVER['HTTP_REFERER']);
} else {
   echo "Ошибка при отправке данных.";
}
