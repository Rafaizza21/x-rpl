<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rafa</title>
</head>
<body>
    <div>
        <div>
            <ul>
                <li><a href="?menu=home">Home</a></li>

                <?php if (!isset($_SESSION['email'])): ?>
                    <li><a href="?menu=register">Register</a></li>
                    <li><a href="?menu=login">Login</a></li>
                <?php else: ?>
                    <li><a href="?menu=logout">Logout</a></li>
                    <li><a href="?menu=user">User</a></li>
                <?php endif; ?>
            </ul>
        </div>

        <div>
            <?php
            if (isset($_GET['menu'])) {
                $isi = $_GET['menu'];

                switch ($isi) {
                    case 'register':
                        require_once("register.php");
                        break;

                    case 'login':
                        require_once("login.php");
                        break;

                    case 'logout':
                        require_once("logout.php");
                        break;

                    case 'user':
                        require_once("user.php");
                        break;

                    case 'home':
                        require_once("index.php");
                        break;

                    default:
                        require_once("index.php");
                        break;
                }
            } else {
                require_once("index.php");
            }
            ?>
        </div>
    </div>
</body>
</html>