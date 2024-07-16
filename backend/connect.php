<?php 
  $servername = 'localhost';
  $username = 'root';
  $password = '';
  $dbname = 'quiz';

  $conn =  new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    $sql = 'CREATE DATABASE quiz';
    $conn = new mysqli($servername, $username, $password);
    $result = $conn->query($sql);
    if ($result !== false && $result->num_rows > 0) {
        echo 'MAJOR ERROR: CONTACT THE ADMINISTRATOR IMMEDIATELY';
    }
    else{
        $conn = new mysqli($servername, $username, $password, $dbname);
    }
  }

  session_start();
?>