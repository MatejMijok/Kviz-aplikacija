<?php 
include 'connect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$gamesPlayed = $data['gamesPlayed'];
$questionsAnswered = $data['questionsAnswered'];
$correctAnswers = $data['correctAnswers'];

$checkStmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$checkStmt->bind_param("s", $username);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$checkStmt->close();

if ($checkResult->num_rows > 0) {
    $userRow = $checkResult->fetch_assoc();
    $userID = $userRow['id'];

    $updateStmt = $conn->prepare("UPDATE userstatistics SET gamesPlayed = ?, questionsAnswered = ?, correctAnswers = ? WHERE idUser = ?");
    $updateStmt->bind_param("ssss", $gamesPlayed, $questionsAnswered, $correctAnswers, $userID);
    $updateSuccess = $updateStmt->execute();
    $updateStmt->close();

    if ($updateSuccess) {
        $_SESSION['username'] = $username;
        $_SESSION['gamesPlayed'] = $gamesPlayed;
        $_SESSION['questionsAnswered'] = $questionsAnswered;
        $_SESSION['correctAnswers'] = $correctAnswers;
        echo json_encode(["success" => true, 'data' => $_SESSION]);
    } else {
        echo json_encode(["success" => false, "error" => "ERROR WHILE UPDATING USER STATISTICS"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Korisnik s tim korisničkim imenom ne postoji"]);
}

$conn->close();
?>
