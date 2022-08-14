<?php
session_name("logined");
session_start();
if(!isset($_SERVER['HTTP_REFERER'])){
    header('location:error.html');
    exit;
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
        <title>Numed - Admin Panel</title>
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
                        <li><a class="nav__link" href="admin.php">Admin</a></li>
                        <li><a class="nav__link" href="contacts.php">Contacts</a></li>
                    </div>
                </ul>
            </nav>
        </header>
        <section>
            <div class="section__switcher">
                <a class="order__switcher"><i class="far fa-user"></i> Orders</a>
                <a class="create__card"><i class="fas fa-plus"></i> Create Card</a>
                <a class="delete__card"><i class="fas fa-trash"></i> Delete card</a>
            </div>
            <div class="section__container">
                <div class="order__container">
                    <h2 class="order__title">Orders</h2>
                    <div class="order__inner">
                        <table class="table__info">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Items</th>
                                    <th>Delivery</th>
                                    <th>Payment</th>
                                    <th>Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                            $dbh = new PDO('mysql:dbname=japan; host=localhost', 'root', '');
                            $get = $dbh->prepare("SELECT `Customer`, `Phone`, `Items`, `Delivery`, `Payment`, `TotalPrice` FROM `orders` ORDER BY id DESC");
                            $get->execute();
                            $orders = $get->fetchAll(PDO::FETCH_ASSOC);
                            ?>
                                <?php foreach ($orders as $row) : ?>
                                    <tr>
                                        <td class="order__customer"><?php echo $row['Customer'] ?></td>
                                        <td><?php echo $row['Phone'] ?></td>
                                        <td><?php echo $row['Items'] ?></td>
                                        <td><?php echo $row['Delivery'] ?></td>
                                        <td><?php echo $row['Payment'] ?></td>
                                        <td><?php echo $row['TotalPrice'] ?></td>
                                        <td>
                                            <button class="btn__close"><i class="fas fa-times"></i></button>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?> 
                                </tbody>
                        </table>
                    </div>
                </div>
                <div class="create-card__container">
                    <h2 class="create-card__title">Create Card</h2>
                    <div class="create-card__inner">
                        <form class="create__form"  action="assets/php/cards/createCard.php" method="post" enctype="multipart/form-data">
                        <div class="create-card__photo">
                            <div class="card__text">
                                <i class="fas fa-upload"></i>
                                <label for="card__photo">Перенесіть картинку <span>або</span>
                                    натисніть на область</label>
                            </div>
                            <input class="input__photo" id="card__photo" type="file" name="image">
                        </div>
                        <div class="form__details">
                                <h3 class="card__chapter">Card Details</h3>
                            <div class="main__info">
                                <div class="title__section">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" id="title"
                                        placeholder="Tea, Katana, Surkin etc." required>
                                </div>
                                <div class="price__section">
                                    <label for="price">Price</label>
                                    <input class="input-price" type="number" name="price" id="price" min="1" max="999" maxlength="3" size="3"
                                        placeholder="Without $" required>
                                </div>
                                <div class="rating__section">
                                    <label for="rating">Rating Value</label>
                                    <input type="number" id="rating" name="rating" placeholder="4.2"  min="1" max="5" maxlength="3" size="3" require>
                                </div>
                            </div>
                            <label for="selection">Selection group</label>
                            <input type="text" name="values" id="selection" placeholder="M(400g), L(700g), XL(1500)"
                                required>
                                <label for="description">Item description</label>
                                <textarea name="description" id="description" cols="30" rows="10" placeholder="Descripe item"
                                required></textarea>
                            <input class="btn__submit" type="submit" value="Create">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="delete__card-container">
                <h2 class="delete__card-title">Delete Card</h2>
                    <div class="cards">
                    <?php $dbh = new PDO('mysql:dbname=japan; host=localhost', 'root', '');;
                            $get = $dbh->prepare("SELECT `title`, `price`, `description`, `img`, `imgAlt`, `ratingValue` FROM `cards` ORDER BY id DESC");
                            $get->execute();
                            $orders = $get->fetchAll(PDO::FETCH_ASSOC);
                            ?>
                                <?php foreach ($orders as $row) : ?>
                                    <div class="card">
                                        <div class="remove__button-container">
                                        <button class="btn__remove"><i class="fas fa-trash"></i></button>
                                    </div>
                                    <div class="rating rating_set">
                                        <div class="rating__body">
                                            <div class="rating__active"></div>
                                            <div class="rating__items">
                                                <input type="radio" class="rating__item" value="1" name="rating">
                                                <input type="radio" class="rating__item" value="2" name="rating">
                                                <input type="radio" class="rating__item" value="3" name="rating">
                                                <input type="radio" class="rating__item" value="4" name="rating">
                                                <input type="radio" class="rating__item" value="5" name="rating">
                                            </div>
                                        </div>
                                        <output class="rating__value"><?php echo $row['ratingValue'] ?></output>
                                    </div>
                                    <div class="card__img">
                                        <img src="<?php echo $row['img'] ?>" alt="<?php echo $row['imgAlt'] ?>">
                                    </div>
                                    <h1 class="card__title"><?php echo $row['title'] ?></h1>
                                    <h2 class="card__price"><?php echo $row['price'] ?></h2>
                                </div>
                            <?php endforeach; ?> 
                    </div>
                </div>
            </div>
        </section>
        <script src="https://kit.fontawesome.com/c58ff47bab.js" crossorigin="anonymous"></script>
        <script src="assets/js/admin.js"></script>
        <script src="assets/js/dragAndDrop.js"></script>
        <script src="assets/js/hamburg.js"></script>
    </body>