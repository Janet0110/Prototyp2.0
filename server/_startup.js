console.log("Starting server...");

/*
if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        email: 'JanetRahn@msn.com',
        password: "testtest",
        username: "Janet0110"
    });
    Accounts.createUser({
        email: 'Admin@msn.com',
        password: "testtest",
        username: "Admin"
    });
}

var aUser = Meteor.users.findOne({ username: 'Admin'});
var teamId;
if (Teams.find().count() === 0) {
    teamId = Teams.insert({
        name: 'public',
        owner: aUser._id,
        users: [{
            user: aUser._id
        }
        ]
    });
    Meteor.users.update({_id: aUser._id}, {$set: {
        teams: [
            {teamId: teamId,
            },
        ]
    }});

    var channelId = Channels.insert({
        name: 'general',
        private: false,
        team:{
            _id: teamId,
            teamName:"public"
        },
        createdBy: aUser._id,
        timestamp: new Date()
    });
}


if(Messages.find().count() === 0){
    var messages = ["Dies ist die erste Nachricht", "Dies ist die zweite Nachricht", "Dies ist die dritte Nachricht"];

    messages.forEach(function(message){
        Messages.insert({
            text: message,
            date: new Date(),
            user: aUser._id,
            team: teamId,
            channel: channelId
        })
    })
}*/
