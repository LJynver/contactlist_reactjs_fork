<?php
    header("Access-Control-Allow-Origin: *");
    session_start();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "lejdb";
    
    //turning on the connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    //checking the connection if successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>