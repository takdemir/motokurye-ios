<?php

//Setting values for the database
$servername = "localhost";
                       $username = "root";
$password = "";
$dbname = "tutorial";

//Connecting the database
$conn = mysqli_connect($servername, $username, $password,$dbname);
$email = $_POST['email'];
$msg = $_POST['msg'];
$noti =$_POST['noti'];
echo "Submitted";

//Retrievin Registration ID from the database with the help of email
$sql = "SELECT regid FROM gcm where email='\"'.$email.'\"'";

//Executing the query
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $regid = mysqli_fetch_assoc($result);
} else {
    echo "0 results";
}

//closing the database connection
mysqli_close($conn);

//Setting Server API Key that we generated in the Google Developer Console
define( 'API_ACCESS_KEY', 'AIzaSyDS-bvcpaIOpYE9i6WtBIUb6ULl14SNPuc' );

//Storing Fetched Registration ID to the vaiable 'to'. 'to' is an array of registration IDs whom we want to send push notification
$to=$regid;

//This 'to' is assigned to registrationIds
$registrationIds = array($to);

//Message Array
$msg = array
    (

//Message that we want to send in the push notification
'message' => $msg,

//Title that we want to set for the push notification
'title' => $noti,

//Subtitle, ticker text
'subtitle' => 'This is a subtitle. subtitle',
'tickerText' => 'Ticker text here...Ticker text here...Ticker text here',

//Sets to true or '1' if we want device to vibrate and make sound when user recieves push notification
'vibrate' => 1,
'sound' => 1,
'largeIcon' => 'large_icon',
'smallIcon' => 'small_icon'
);

//RegistrationIds and message are assigned to fields
$fields = array
(
    'registration_ids' => $registrationIds,
    'data' => $msg
);
$headers = array
    (

//Setting headers for API acceess key and content type
'Authorization: key=' . API_ACCESS_KEY,
'Content-Type: application/json'
);

//Initializing Curl
$ch = curl_init();

//Posting data to the following URL
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );

//Post Data = True, Defining Headers and SSL Verifier = false
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );

//Posting fields array in json format
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );

//Executing Curl
$result = curl_exec($ch );

//Closing Curl
curl_close( $ch );
echo $result;
?>