<?php 
    include 'connect.php';

    if ($conn->connect_error) {	
        die('Connection failed: '. $conn->connect_error);
      }

    $sql = 'CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        fname VARCHAR(255) NOT NULL,
        lname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        userRole VARCHAR(255), 
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )';

    if (!$conn->query($sql)) {
        echo 'ERROR CREATING TABLE USERS';
    }

    $sql = 'CREATE TABLE IF NOT EXISTS categories(
        id INT AUTO_INCREMENT,
        category VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )';

    if(!$conn->query($sql)) {
        echo 'ERROR CREATING TABLE CATEGORIES';
    }
    
    $sql = 'CREATE TABLE IF NOT EXISTS questions(
        id INT AUTO_INCREMENT,
        idCategory INT NOT NULL,
        questionText TEXT NOT NULL, 
        firstAnswer VARCHAR(255) NOT NULL,
        secondAnswer VARCHAR(255) NOT NULL,
        thirdAnswer VARCHAR(255) NOT NULL,
        correctAnswer VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (idCategory) REFERENCES categories(id) on delete cascade
    )';

    if (!$conn->query($sql)) {
        echo 'ERROR CREATING TABLE QUESTIONS';
    }

    $sql = 'CREATE TABLE IF NOT EXISTS userLogs(
        id INT AUTO_INCREMENT,
        idUser INT,
        lastLogin DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (idUser) REFERENCES users(id) on delete cascade
    )';

    if (!$conn->query($sql)) {
        echo 'ERROR CREATING TABLE USERLOGS';
    }

$sql = 'CREATE TABLE IF NOT EXISTS userstatistics(
        id INT AUTO_INCREMENT,
        idUser INT,
        gamesPlayed INT DEFAULT 0,
        questionsAnswered INT DEFAULT 0,
        correctAnswers INT DEFAULT 0,
        PRIMARY KEY (id),
        FOREIGN KEY (idUser) REFERENCES users(id) on delete cascade
    )';

    if (!$conn->query($sql)) {
        echo 'ERROR CREATING TABLE USERSTATISTICS';
    }
?>