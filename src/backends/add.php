<?php
    require("db_connect.php");

    $retVal = "Addition failed.";
    $isValid = true;
    $status = 400;
    $data = -1;

    $fname = trim($_GET['fname']);
    $lname = trim($_GET['lname']);
    $emailAdd = trim($_GET['emailAdd']);
    $contactNum = trim($_GET['contactNum']);

    

    // Check if email already exists
    if($isValid){
        $stmt = $conn->prepare("SELECT * FROM contact WHERE email = ?");
        $stmt->bind_param("s", $emailAdd);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        $ver_email = filter_var($emailAdd, FILTER_VALIDATE_EMAIL);

        if($result->num_rows > 0){
            $isValid = false;
            $retVal = "Email already exists.";
        } else if ($ver_email == false) {
            $isValid = false;
            $retVal = "Email is not valid";
        }
    }

    // Insert records
    if($isValid){
        try {
            $stmt = $conn->prepare("INSERT INTO contact(firstName,lastName, email, number) values( ? , ? , ? , ? )");
            $stmt->bind_param("ssss",$fname,$lname,$emailAdd,$contactNum);
            $stmt->execute();
            $stmt->close();
            $data = mysqli_insert_id($conn);
            $status = 200;
            $retVal = "Contact added.";
        } catch (Exception $e) {
            $retVal = $e->getMessage();
        }
    }

    $myObj = array(
        'status' => $status,
        'data' => $data,
        'message' => $retVal  
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    echo $myJSON;
    mysqli_close($conn);
?>