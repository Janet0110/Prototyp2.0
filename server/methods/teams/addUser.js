Meteor.methods({
    'team.addUser': function(opts, callback) {
        if (Teams.find({"users._id": opts.userId}).count() > 0) {
            throw new Meteor.Error("User already in team");
        }else{
            Teams.update({_id: opts.teamId}, { $addToSet: {
                'users': {
                    user: opts.userId
                }
            }});

            var role = Roles.findOne({_id: "user"}, {fields: {_id: 1}});
            if(role){
                Meteor.call('addUserToRole', role._id, opts.teamId, opts.userId)
            }else{
                throw new Meteor.Error("Role not found");
            }
        }
    }
});