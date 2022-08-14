<?php
if (isset($_COOKIE["logined"])){
    header('location:admin.php');
}
?>

<!DOCTYPE html>
<html lang="uk">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Інтернет-магазин, Японія, Самурай, Чай, купити катану,
        Shop, Japan, Katana, Tea, Buy tea, Online-shop">
        <meta name="description" content="Want to feel what it's like to be a real warrior?
        Get new sensations that take you to the XVII century, and learn the power of samurai.">
        <meta property="og:title" content="Numed">
        <meta property="og:image"
            content="https://i.pinimg.com/originals/70/70/ef/7070ef1931c6ec64652960edd09f469e.jpg">
        <meta property="og:description" content="Want to feel what it's like to be a real warrior?
        Get new sensations that take you to the XVII century, and learn the power of samurai.">
        <title>Numed - Login</title>
        <link rel="stylesheet" href="assets/css/app.min.css">
        <link rel="stylesheet" href="assets/css/animate.css">
        <link rel="shortcut icon" href="assets/img/favicon.png">
    </head>

    <body>
        <!-- HEADER -->
        <header>
            <nav>
                <ul class="navbar">
                    <div class="header__logo">
                        <a href="index.html"><img src="assets/img/header/logo.png" alt="Logo"></a>
                    </div>
                    <div class="toggle__navbar"><i class="fas fa-bars"></i></div>
                    <div class="navbar__navigation">
                        <li><a class="nav__link" href="products.php">Products</a></li>
                        <li><a class="nav__link" href="login.php">Login</a></li>
                        <li><a class="nav__link" href="contacts.php">Contacts</a></li>
                    </div>
                </ul>
            </nav>
        </header>
        <section class="login">
            <div class="login__img">
                <img src="assets/img/login/loginImg.jpg" alt="Login Img">
            </div>
            <div class="login__container">
                <div class="login__inner">
                    <h2 class="login__title">Sign in</h2>
                    <form class="login__form"  method="post">
                    <div class="input__field">
                        <input type="email" name="Login" id="login" required>
                        <label for="login">Login</label>
                        <span class="error-text">Login can't be empty</span>
                    </div>
                    <div class="input__field">
                        <input type="password" name="Password" id="password" required>
                        <label for="password">Password</label>
                        <span class="error-text">Password can't be empty</span>
                    </div>
                        <button class="btn__login" type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </section>
        <script src="https://kit.fontawesome.com/c58ff47bab.js" crossorigin="anonymous"></script>
        <script src="assets/js/login.js"></script>
        <script src="assets/js/hamburg.js"></script>
    </body>