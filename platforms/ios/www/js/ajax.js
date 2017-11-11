/**
 * Created by taner on 12.11.2016.
 */


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
            sound: "true",
            senderID: "809436805306"
        },
        windows: {}
    });

    <!--This will alert registration ID which is returned by the GCM-->
    push.on('registration', function(data) {
        //common.showToast("Bağlantı Kuruldu!","short","center",0);
        window.localStorage.setItem("regid",data.registrationId);
    });
    push.on('notification', function(data) {

        if(window.localStorage.getItem("kuryeID")!="" && window.localStorage.getItem("kuryeID")>0) {
            mypanel.getjobsOnkurye(window.localStorage.getItem("kuryeID"));
            mypanel.getdeliveredjobsOnkurye(window.localStorage.getItem("kuryeID"));
        }

        navigator.notification.alert(
            data.message,         // message
            null,                 // callback
            data.title,           // title
            'Tamam'                  // buttonName
        );


    });
    push.on('error', function(e) {
    });

}


var ajax={

    sessionID: null,
    sessionName: null,
    sessionKuryeId: null,
    getipurl: "https://tbmsoft.xyz",

    getip: function () {

        var sirketid=$("#txt-sirketid").val();
        var data={"sirketid":sirketid};

        $.ajax({
            url: ajax.getipurl+"/getsirketip",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
                //alert("ip alınıyor"+ajax.getipurl);
            },
            error: function (a,b,c) {
                common.showToast("Şirket bilgilerinize ulaşılamadı!","long","center",0);
            },
            success: function (data) {

                if(!data.hasError){
                    window.localStorage.setItem("ipurl",data.data);
                    ajax.login();
                }else{
                    common.showToast(data.msg,"long","center",0);
                }
            }

        });

    },
    login: function () {

        var username=$("#txt-email").val();
        var password=$("#txt-password").val();
        var data={"username":username,"password":password};

        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/kuryelogin",
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            beforeSend: function () {
            },
            error: function (a,b,c) {
                common.showToast("Login esnasında hata oluştu!","long","center",0);
            },
            success: function (data) {

                if(!data.hasError){
                    ajax.opensession(data.data.id,data.data.kuryeAdi);
                    ajax.creategcm();
                }else{
                    common.showToast(data.msg,"long","center",0);
                }
            }

        });
    },
    opensession: function (sessionKuryeId,kuryeName) {

        if (typeof(Storage) !== "undefined") {
            window.localStorage.setItem("kuryeID",sessionKuryeId);
            window.localStorage.setItem("kuryeName",kuryeName);
            if(window.localStorage.getItem("kuryeID")>0 && window.localStorage.getItem("kuryeID")!=""){
                window.location.href="mypage.html";
            }else{
                common.showToast("Oturum açılamıyor. Lütfen yöneticinize başvurun!","long","center",0);

            }
        } else {

        }

    },

    creategcm: function () {

        var regid = window.localStorage.getItem("regid");
        var kuryeID = window.localStorage.getItem("kuryeID");
        var email = "";

        var data={"regid": regid,"kuryeID": kuryeID, "email":email}
        <!--Passing those values to the insertregid.php file-->
        $.ajax({
            url: window.localStorage.getItem("ipurl")+"/insertregid",
            type: "POST",
            data: JSON.stringify(data),
            dataType:'json',
            beforeSend: function () {
            },
            error: function (a,b,c) {
                common.showToast("GCM bağlantınızı yapamıyorum!","long","center",0);
            },
            success: function(data){
                if(!data.hasError){
                    return true;
                }
            }
        });

    },
    onError: function () {
        //alert("değişiklik yok");
    }

};
