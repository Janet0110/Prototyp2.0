Template.channelSidebar.helpers({
    channelName: function(){
        return Session.get("channel");
    },
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

//            var list = Channels.find({_id: currentChannelId()}, {fields: {
//                'users.user': 1
//            }}).fetch();
//
//            var usersList = list[0].users;
//            for (var i in usersList) {
//                users.push({name: User.getUserById(usersList[i]).username});
//            }
//            return users;
        }

    }
});

