<?php
include "connect.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];
$email = $data["email"];
$fname = $data["fname"];
$lname = $data["lname"];
$userRole = "user";
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$checkStmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$checkStmt->bind_param("s", $username);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$checkStmt->close();

if ($checkResult->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Korisničko ime već postoji"]);
} else {
    $stmt = $conn->prepare("INSERT INTO users (username, password, fname, lname, email, userRole) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $username, $hashedPassword, $fname, $lname, $email, $userRole);

    if ($stmt->execute()) {
        $newUserID = $conn->insert_id;
        $stmt = $conn->prepare("INSERT INTO userstatistics (idUser) VALUES (?)");
        $stmt->bind_param("s", $newUserID);
        if ($stmt->execute()) {
            $_SESSION['username'] = $username;
            $_SESSION['fname'] = $fname;
            $_SESSION['lname'] = $lname;
            $_SESSION['userRole'] = $userRole;
            $_SESSION['gamesPlayed'] = 0;
            $_SESSION['questionsAnswered'] = 0;
            $_SESSION['correctAnswers'] = 0;
            echo json_encode(["success" => true, 'data' => $_SESSION]);
        }
        $stmt = $conn->prepare("INSERT INTO userLogs (idUser) VALUES (?)");
        $stmt->bind_param("s", $newUserID);
        $stmt->execute();
    } else {
        echo json_encode(["success" => false, "error" => "ERROR WHILE SAVING USER"]);
    }

    $stmt->close();
}

$conn->close();
?>
