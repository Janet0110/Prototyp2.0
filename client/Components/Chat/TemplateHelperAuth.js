/*Helpers für die Verwendung im Template*/
Template.mainLayout.helpers({
    authInProcess: function () {
        /*Überprüft ob der Benutzer eingeloggt ist*/
        return User.isLoggedIn();
    },
    /*Überprüft ob der Benutzer im Team ist, damit dem Benutzer die Chatinstanz angezeigt werden kann*/
    canShow: function() {
        return (Teams.find({$and: [{_id: currentTeamId()}, {"users.user": User.id()}]}).count() == 1);

    },
    /*Überprüft ob die ChannelSidebar angezeigt werden soll*/
    channelSidebarActiv: function(){
        return Session.get("channelSidebar");
    }
});

