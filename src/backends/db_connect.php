<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-type");

    session_start();

    $servername = "localhost";
    $username = "root";
    $password = "phpJOVER@2102";
    $dbname = "my-database-2102";
    
    //turning on the connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    //checking the connection if successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>