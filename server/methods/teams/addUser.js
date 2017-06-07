Meteor.methods({
    /*Fügt einen Benutzer dem Team hinzu*/
    'team.addUser': function(opts, callback) {
        /*Überprüft, ob sich Benutzer bereits schon im Team befindet*/
        if (Teams.find({"users._id": opts.userId}).count() > 0) {
            throw new Meteor.Error("User already in team");
        }else{
            /*aktualisiert Eintrag in MongoDB und fügt den Benutzer zur Liste in der Collection teams hinzu*/
            Teams.update({_id: opts.teamId}, { $addToSet: {
                'users': {
                    user: opts.userId
                }
            }});
            /*Hinzugügen der Channelrollen für das neue Mitglied (public)*/
            var role = Roles.findOne({_id: "user"}, {fields: {_id: 1}});
            if(role){
                Meteor.call('addUserToRole', role._id, opts.teamId, opts.userId)
            }else{
                throw new Meteor.Error("Role not found");
            }
        }
    }
});