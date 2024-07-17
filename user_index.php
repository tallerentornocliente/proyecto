<?php
session_start();
if(!isset($_SESSION["registro"]) || $_SESSION["rol"]!="usuario"){
    header("location:login.php");
    exit;
}
?>
<!-- Contenido para usuarios -->
<h1>Bienvenido usuario!</h1>