<?php 
    include 'connect.php';

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    $categoryName = $data["categoryName"];

    $checkStmt = $conn->prepare("SELECT * FROM categories WHERE category = ?");
    $checkStmt->bind_param("s", $categoryName);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    $checkStmt->close();

    if ($checkResult->num_rows > 0) {
        echo json_encode(["success" => false, "error" => "Category already exists"]);
    } else {
        $stmt = $conn->prepare("INSERT INTO categories (category) VALUES (?)");
        $stmt->bind_param("s", $categoryName);
        
        if($stmt->execute()){
            echo json_encode(["success"=> true, 'data' => $categoryName]);
        }
        else{
            echo json_encode(["success"=> false,"error"=> "ERROR CREATING CATEGORY"]);
        }
        $stmt->close();
    }

    $conn->close();
?>
