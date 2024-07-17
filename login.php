<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        body {
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        #container {
            max-width: 400px;
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .login-image {
            width: 100px;
            margin-bottom: 20px;
        }
        .alert-message {
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
<div id="container" class="container">
    <form action="comprueba_login.php" method="post">
        <h1 class="text-center">Iniciar Sesión</h1>
        <div class="text-center">
            <img src="./img/user.png" alt="Login" class="login-image">
        </div>
        <div class="mb-3">
            <input type="text" name="usuario" class="form-control" placeholder="Usuario" required>
        </div>
        <div class="mb-3">
            <input type="password" name="clave" class="form-control" placeholder="Contraseña" required>
        </div>
        <div class="mb-3">
            <select name="rol" class="form-control" required>
                <option value="">Seleccione un rol</option>
                <option value="administrador">Administrador</option>
                <option value="usuario">Usuario</option>
            </select>
        </div>
        <p class="alert-message text-center">Al ingresar acepto las politicas</p>
        <button class="btn btn-primary w-100" type="submit">Ingresar</button>
    </form>
</div>

</body>
</html>
