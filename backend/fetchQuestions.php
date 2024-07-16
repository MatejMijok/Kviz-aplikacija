<?php
include 'connect.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

$sql = 'SELECT * FROM questions';
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $questions = array();
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
    echo json_encode(["success" => true, 'data' => $questions]);
} else {
    echo json_encode(['success' => false, 'message' => 'No questions found']);
}   
$conn->close();
?>
