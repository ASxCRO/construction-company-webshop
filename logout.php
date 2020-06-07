<?php
    $_SERVER['HTTP_REFERER'] = "/projekt/index.html";
    Session_start();
    Session_destroy();
    header('Location: ' . $_SERVER['HTTP_REFERER']);
?>