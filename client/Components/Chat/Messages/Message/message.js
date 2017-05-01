
Template.registerHelper("timestampToTime", function (timestamp){
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.message.onRendered(function () {
    $('.messages_container').scrollTop( $('.messages_container').prop("scrollHeight") );
});

Template.registerHelper("usernameFromId", function(userId){
    var user = Meteor.users.findOne({_id: userId});
    return user.username;

});

