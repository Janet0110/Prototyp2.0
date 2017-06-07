/*Handling der Events, die an ein Element gebunden werden*/
Template.teamCreate.events({
    /*Form-Submit, um ein neues Team zu erstllen*/
    'submit .teamCreate': function (e, template) {
        e.preventDefault();
        var teamname = $(e.target).find('[name="teamName"]').val();
        var user = User.id();

        var optsTeam = {
            name: teamname,
            owner: user,
            users: [
                {
                    user: user
                }
            ]
        };

        Meteor.call("team.add", optsTeam, function(err, result){
            if(!err){
                Meteor.call("channels.add", result, 'general', function(err){
                    if(!err){
                        Materialize.toast("Channel created", 4000, "success");
                    }else{
                        Materialize.toast(err.message, 4000, "error");
                    }
                });
                FlowRouter.go('/teams');
                Materialize.toast("Team created", 4000, "success");
            }else{
                Materialize.toast(err.message, 4000, "error");
            }
        });
    }
});