
Template.invite.onCreated(function(){
    var inviteId = FlowRouter.getParam("inviteId");
    Meteor.subscribe("invite", inviteId);
    this.inviteId = inviteId;
    this.invite = new ReactiveVar(null);
});

Template.invite.helpers({
    teamName: function(){
        return "test"
    },
    invite: function() {

    }
});

Template.invite.events({
    'click .accept': function(e, tmpl){
        e.preventDefault();
        var invite = Invites.find({_id: tmpl.inviteId}).fetch();
        Meteor.call("acceptInvite", invite, function(err, result){
            if(err){
                Materialize.toast(err.message, 4000, "error");
            }else{
                if(!result){
                    FlowRouter.go('/register');
                    Materialize.toast("You must first register", 4000, "success");
                }else{
                    if(result.accountCreated){
                        FlowRouter.go('/login');
                        Materialize.toast("Invite accepted", 4000, "success");
                    }
                }
            }
        });
    }
});

