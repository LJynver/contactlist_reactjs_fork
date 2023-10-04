<?php
    require("db_connect.php");
    $retVal = "Delete failed.";
    $status = 400;

    $id = trim($_REQUEST['id']);

    try {
        $stmt = $conn->prepare("DELETE FROM contact WHERE id = $id");
        $stmt->execute();
        $stmt->close();
        $status = 200;
        $retVal = "Contact deleted.";
    } catch (Exception $e) {
        $retVal = $e->getMessage();
    }

    $myObj = array(
        'status' => $status,
        'message' => $retVal
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    echo $myJSON;
?>