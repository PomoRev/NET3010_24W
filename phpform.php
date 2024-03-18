<!DOCTYPE html>

<?php 
    try { require_once "databasehelper.php"; } catch(Exception $e) {echo "oh no, this is not good."; } 
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Prof. Frank Emanuel">
    <meta name="email" content="emanuef@algonquincollege.com">
    <meta name="date" content="2024-03-18">
    <title>Making a Form</title>
</head>
<body>

    <?php include "simpleheader.txt"; ?>

    <p>
        Hello?  <?php echo $_GET['username'] ?? $_POST['username'] ?? "Who you is?"; ?>
    </p>

    <nav>
        <a href="phpform.php"><button>Home</button></a>
    </nav>

    <form action="" method="get">

        <label for="name">Name: </label>
        <input type="text" name="username" id="name">

        <br>

        <label for="phonenumber">Phone: </label>
        <input type="tel" name="cell" id="phonenumber">

        <br>

        <button type="submit">Press Me Now!</button>

    </form>

    <footer style="padding: 10px;">
        Some Footer Information
    </footer>
</body>
</html>