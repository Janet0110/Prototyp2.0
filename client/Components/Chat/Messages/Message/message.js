/*Helpers für die Verwendung im Template*/
Template.registerHelper("timestampToTime", function (timestamp){
    /*Formatierung der Zeitangabe für das Anzeigen in der Nachricht*/
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});
/*Beim Rendern des Templates soll nach unten gescrollt werden. Erneutes Rendern, wird durch das Hinzufügen einer Nachricht, ausgeführt*/
Template.message.onRendered(function () {
    $('.messages_container').scrollTop( $('.messages_container').prop("scrollHeight") );
});

/*Template Helper für die Anzeige des Usernamens bei der Nachricht*/
Template.registerHelper("usernameFromId", function(userId){
    var user = Meteor.users.findOne({_id: userId});
    return user.username;

});

