Meteor.methods({
    /*Löscht eine Channel-Rolle*/
    'removeUserFromRole': function(roleName, teamId,  userId , channelsRoles){
        if(Meteor.userId()){
            if(roleName === "admin" || roleName === "user"){
               return Meteor.users.update(
                    { _id: userId },
                    { $set: {"teams.role": roleName}}
                );
            }else{

            }
        }
    }
});