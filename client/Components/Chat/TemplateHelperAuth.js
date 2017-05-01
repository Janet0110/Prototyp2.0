Template.mainLayout.helpers({
    authInProcess: function () {
        return User.isLoggedIn();
    },
    canShow: function() {
       // console.log(Teams.find({$and: [{_id: currentTeamId()}, {"users.user": User.id()}]}).count() == 1);
        return (Teams.find({$and: [{_id: currentTeamId()}, {"users.user": User.id()}]}).count() == 1);

    },
    channelSidebarActiv: function(){
        return Session.get("channelSidebar");
    }
});

