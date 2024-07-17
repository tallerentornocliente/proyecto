<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
<?php
try{
    $base=new PDO("mysql:host=localhost;dbname=juego","root","");
    $base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT * FROM usuarios_pass WHERE usuario=:usuario AND clave=:clave AND rol=:rol";

    $resultado=$base->prepare($sql);
    $usuario=htmlentities(addslashes($_POST['usuario']));
    $clave=htmlentities(addslashes($_POST['clave']));
    $rol=htmlentities(addslashes($_POST['rol']));

    $resultado->bindValue(":usuario", $usuario);
    $resultado->bindValue(":clave", $clave);
    $resultado->bindValue(":rol", $rol);

    $resultado->execute();

    $numero_registro=$resultado->rowCount();
    if($numero_registro!=0){
        $fila=$resultado->fetch();  
        session_start();
        $_SESSION["registro"]=$_POST["usuario"];
        $_SESSION["rol"]=$fila["rol"];  

        if($fila["rol"]=="administrador"){  
            header("location:index.html");
        }else{
            header("location:user_index.php");
        }
    }else{
        header("location:login.php");
    }

}catch(Exception $e){
    die("error:".$e->getMessage());
}
?>
    
</body>
</html>
