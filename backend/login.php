<?php
include 'connect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Error logging in user']);
    exit;
}

$username = $data['username'];
$password = $data['password'];

$stmt = $conn->prepare("SELECT id, username, password, fname, lname, userRole, email FROM users WHERE username = ?");
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if(password_verify($password, $row['password'])){
            $stmt = $conn->prepare("SELECT gamesPlayed, questionsAnswered, correctAnswers FROM userstatistics WHERE idUser = ?");
            $stmt->bind_param("s", $row['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $userStatisticsRow = $result->fetch_assoc();

            $stmt = $conn->prepare("UPDATE userLogs SET lastLogin = CURRENT_TIMESTAMP WHERE idUser = ?");
            $stmt->bind_param("s", $row['id']);
            $stmt->execute();

            $_SESSION['username'] = $username;
            $_SESSION['fname'] = $row['fname'];
            $_SESSION['lname'] = $row['lname'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['userRole'] = $row['userRole'];
            $_SESSION['gamesPlayed'] = $userStatisticsRow['gamesPlayed'];
            $_SESSION['questionsAnswered'] = $userStatisticsRow['questionsAnswered'];
            $_SESSION['correctAnswers'] = $userStatisticsRow['correctAnswers']; 

            echo json_encode(['success' => true, 'data' => $_SESSION]);
        }else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
    }  else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error logging in user']);
}

$stmt->close();
$conn->close();
?>
