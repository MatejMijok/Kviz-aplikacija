<?php 
    include 'connect.php';

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    $questionText = $data["questionText"];
    $answerOne = $data["answerOne"];
    $answerTwo = $data["answerTwo"];
    $answerThree = $data["answerThree"];
    $correctAnswer = $data["correctAnswer"];
    $categoryID = $data["category"];

    $stmt = $conn->prepare("INSERT INTO questions (idCategory, questionText, firstAnswer, secondAnswer, thirdanswer, correctAnswer) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $categoryID, $questionText, $answerOne, $answerTwo, $answerThree, $correctAnswer);

    if($stmt->execute()){
        echo json_encode(["success"=> true]);
    }else{
        echo json_encode(["success"=> false]);
    }
    $stmt->close();
    $conn->close();
?>