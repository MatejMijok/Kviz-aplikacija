<?php 
    include 'connect.php';

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents('php://input'), true);
    
    $question = $data["question"];

    $stmt = $conn->prepare("DELETE FROM questions WHERE id = ?");
    $stmt->bind_param("s", $question);
    $result = $stmt->execute();
    $stmt->close();
    
    if($result){
        echo json_encode(["success" => true]);
    }else{
        echo json_encode(["success" => false]);
    }
?>