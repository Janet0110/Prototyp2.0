Meteor.methods({
    /*Methode für das Erstellen eines neuen Channels*/
    'channels.add': function (teamId, channelName, private, callback) {
        var private = private;
        if(!private){
            private = false;
        }
        /*Überprüft, ob es sich um ein authorisierter Benutzer handelt*/
        if (!this.userId) {
            throw new Meteor.Error("Unauthorized access");
        }else{
            //Überprüfen, ob Channel im Team exisitert(Erstellt den Channel mit den gegebenen Werten)
            if(Channels.find({$and: [{"team._id": teamId}, {name: channelName }]}).count() == 0){
                var team = Teams.find({_id: teamId}).fetch();
                var channel = {
                    name: channelName,
                    private: private,
                    owner: Meteor.userId(),
                    users: {
                        user: Meteor.userId()
                    },
                    team: {
                        _id: teamId,
                        teamName: team[0].name
                    },
                };
                /*fügt Channel der Collection Channels hinzu*/
                var channelInserted = Channels.insert(channel);
                /*weist dem Channelerstelle die Rolle Owner hinzu*/
                if(channelInserted){
                    Meteor.call('addUserToChannelRole', Rol.OWNER, teamId, Meteor.userId(), null, channelName );
                    return channelInserted
                }
            }else{
                throw new Meteor.Error("Channel exists");
            }
        }
    },
    /*liefert Channel durch Angabe des Channelnamens und der TeamId*/
    'channel.getByName': function(channelName, teamId){
        return Channels.findOne({$and: [{name: channelName}, {"team._id": teamId }]})._id;
    }
});