<!-- Database Helper Files -->

<?php

// Connecting to the Database 
// This function requires an address for a database server that is listening for database requests. 
// Because we are using a windows web stack (XAMPP) over the default database port id, we can 
// simply use localhost and log in with credentials.

// Alternatively you could pass in this information, but having it embedded here is fine 
// for our purposes.

function connect2db(){

    $servername = "localhost";
    $dbuser = "frankadmin";
    $dbpassword = "password";

    $db_connect = mysqli_connect($servername, $dbuser, $dbpassword);

    if (!$db_connect) {
        exit("Connection Failed: " . mysqli_connect_error());
    }   
        return $db_connect;
}

function closedb($dbconnection){

    mysqli_close($dbconnection);

}

?>