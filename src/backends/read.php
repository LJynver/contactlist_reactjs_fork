<?php
    require("db_connect.php");

    $editID = isset($_GET['id']) ? $_GET['id'] : null;

    $status = 200;
    $data = array();
    $count = 0;

    if ($editID !== null) {

        $stmt = $conn->prepare("SELECT * FROM contact WHERE id = ?");
        $stmt->bind_param("i", $editID);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        $stmt->close();

        while($row = mysqli_fetch_assoc($result))
        {
            $data[] = $row;
        }

    } else {

        $stmt = $conn->prepare("SELECT * FROM contact ORDER BY lastName");
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        $stmt->close();

        while($row = mysqli_fetch_assoc($result))
        {
            $data[] = $row;
        }
    }

    $myObj = array(
        'status' => $status,
        'data' => $data,
        'count' => $count
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    echo $myJSON;
    mysqli_close($conn);
?>