<?php

//Setting values for the database
$servername = "localhost";
                       $username = "root";
$password = "";
$dbname = "tutorial";

//Connecting the database
$conn = mysqli_connect($servername, $username, $password,$dbname);

//Recieving the values of registration ID,name and email ID sent by index.html
$regid = $_POST['regid'];
$name = $_POST['name'];
$email =$_POST['email'];
echo "Submitted";

//Inserting registration ID,name and email ID in the database
$sql = "INSERT INTO gcm (regid, name, email) VALUES ("."'".$regid."'".","."'".$name."'".","."'".$email."'".")";

//Executing the query and closing the database connection
mysqli_query($conn, $sql);
mysqli_close($conn);
?>