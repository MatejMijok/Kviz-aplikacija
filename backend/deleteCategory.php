<?php 
    include 'connect.php';

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents('php://input'), true);
    
    $category = $data["category"];

    $stmt = $conn->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->bind_param("s", $category);
    $result = $stmt->execute();
    $stmt->close();
    
    if($result){
        echo json_encode(["success" => true]);
    }else{
        echo json_encode(["success" => false]);
    }
?>