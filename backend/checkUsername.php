<?php 
    include 'connect.php';

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'];

    $checkStmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $checkStmt->bind_param("s", $username);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();

    if ($checkResult->num_rows > 0) {
        echo json_encode(["success" => false, "error" => "Username already exists"]);
    } else {
        echo json_encode(["success"=> true]);
    }

    $conn->close();
?>