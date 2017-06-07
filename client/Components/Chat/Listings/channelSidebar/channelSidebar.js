/*Helpers für die Verwendung im Template*/
Template.channelSidebar.helpers({
    /*Für das Anzeigen des Channelnamens in der ChannelSidebar*/
    channelName: function(){
        return Session.get("channel");
    },
    /*Holt sich die Benutzer, die sich in dem Channel befinden, für die Anzeige*/
    userInChannel: function(){
        var users = [];
        var isPublic = Channels.findOne({_id: currentChannelId(), private: false});
        if(isPublic){
            var users = [];
            var usersId = Teams.find({}, {fields: {"users": 1}}).fetch()[0].users
            for(var i = 0; i < usersId.length; i++){
                var user = Meteor.users.find(usersId[i].user).fetch()[0];
                users.push({
                    username: user.username
                });
            }
            return users;
        }else{
            return Meteor.users.find({'teams.id': currentTeamId(), 'teams.channels.id': currentChannelId()}, {fields:{
                username: 1
            }}).fetch();
        }
    }
});

