<?php 
include 'connect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$category = $data["category"];
$newCategoryName = $data["newCategory"];

$updateStmt = $conn->prepare("UPDATE categories SET category = ? WHERE category = ?");
$updateStmt->bind_param("ss", $newCategoryName['categoryName'], $category['category']);
$updateSuccess = $updateStmt->execute();
$updateStmt->close();

if ($updateSuccess) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "ERROR WHILE UPDATING DATA"]);
}

$conn->close();
?>
