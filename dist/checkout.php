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
        <title>Numed - Checkout</title>
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
        <section>
            <div class="section__container">
                <form method="post">
                <input id="inputHidden" type="hidden" name="total">
                <label class="total__price" for="total">Total price: <output name="total"></output></label>
                <h2 class="section__chapter">Personal details</h2>
                <div class="personal__info">
                    <div class="name__section">
                        <label for="name">Name <span>*</span></label>
                        <input type="text" name="firstName" id="name">
                        <label for="surname">Surname <span>*</span></label>
                        <input type="text" name="secondName" id="surname">
                    </div>
                    <div class="contact__section">
                        <label for="phone">Phone number <span>*</span></label>
                        <input type="tel" name="phone" id="phone">
                        <label for="items">Items</label>
                        <input class="item__input" type="text" name="items" id="items">
                    </div>
                </div>
                <h2 class="section__chapter">Delivery details</h2>
                <div class="delivery__info">
                    <div class="delivery__container">
                        <h2 class="delivery__title">Address</h2>
                        <label for="city">City</label>
                        <input type="text" name="city" id="city" autocomplete="off">
                        <label for="select">Nova poshta departments</label>
                        <select name="select" id="select"></select>
                    </div>
                    <div class="payment__container">
                        <h2 class="payment__title">Payment</h2>
                        <div class="method__inner">
                            <input class="btn__radio" type="radio" name="radio__btn"  value="Payment by upon receipt" checked><span>Payment by upon receipt</span>
                        </div>
                        <div class="method__inner">
                            <input class="btn__radio" type="radio" name="radio__btn" value="Payment by credit card (Visa/MasterCard)" >
                            <span>Payment by credit card (Visa/MasterCard)</span>
                        </div>
                        <div class="method__inner">
                            <input class="btn__radio" type="radio" name="radio__btn" value="Payment by parts" ><span>Payment by parts</span>
                        </div>
                    </div>
                </div>
                <div class="submit__container">
                    <button class="btn__submit">Submit</button>
                </div>
                </form>
            </div>
        </section>

        <div class="popup__message">
            <div class="message__container">
                <div class="btn__close-modal">
                    <i class="fas fa-times"></i>
                </div>
                <h2 class="message__title">Thank you for the order!</h2>
                <h3 class="message__suptitle">Our manager call to you as soon as posible for check details</h3>
            </div>
        </div>

        <script src="https://kit.fontawesome.com/c58ff47bab.js" crossorigin="anonymous"></script>
        <script src="assets/js/checkout.js"></script>
        <script src="assets/js/hamburg.js"></script>
        <script src="assets/js/autocomplete.js"></script>
        <script src="assets/js/checkApi.js"></script>
    </body>