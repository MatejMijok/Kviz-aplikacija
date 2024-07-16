<?php
    include 'connect.php';

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $stmt = $conn->prepare("SELECT id, category FROM categories");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $categories = array();

        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }

        echo json_encode(["success" => true, "categories" => $categories]);

    } else {
        echo json_encode(["success" => true, "categories" => []]);
    }


    $stmt->close();
    $conn->close();
?>
