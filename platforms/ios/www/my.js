document.addEventListener("deviceready",onDeviceReady,false);

<!--Device Ready Function-->
function onDeviceReady(){
    //alert("Device Ready");

    <!--Initializing Push Notification-->
    var push = PushNotification.init({

        <!--Setting attributes for Android, IOS and Windows-->
        android: {
            senderID: "809436805306"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    <!--This will alert registration ID which is returned by the GCM-->
    push.on('registration', function(data) {
        $("#regid").val(data.registrationId);
    });
    push.on('notification', function(data) {
    });
    push.on('error', function(e) {
    });
}




var my={}

<!--Fetching the values of registration ID, name and email from the input boxes-->
$(document).ready(function() {
    $("#submit").click(function() {
        var regid = $("#regid").val();
        var kuryeID = window.localStorage.get("kuryeID");
        var email = "";

        var data={"regid": regid,"kuryeID": kuryeID, "email":email}
        <!--Passing those values to the insertregid.php file-->
        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/insertregid",
            type: "POST",
            data: JSON.stringify(data),
            dataType:'json',
            success: function(data){
                alert(data);
            }
        });
    });
});