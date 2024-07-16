<?php 
include 'connect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$user = $data["user"];
$newData = $data['newData'];

$checkStmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$checkStmt->bind_param("s", $user['username']);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$checkStmt->close();

if ($checkResult->num_rows > 0) {
    $userRow = $checkResult->fetch_assoc();

    $updateStmt = $conn->prepare("UPDATE users SET username = ?, fname = ?, lname = ?, email = ? WHERE username = ?");
    $updateStmt->bind_param("sssss", $newData['username'], $newData['fname'], $newData['lname'], $newData['email'], $user['username']);
    $updateSuccess = $updateStmt->execute();
    $updateStmt->close();

    if ($updateSuccess) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "ERROR WHILE UPDATING DATA"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "USER DOES NOT EXIST"]);
}

$conn->close();
?>
