Template.channel.onCreated(function(){
    this.canJoin = new ReactiveVar({channel: null, canAccess: null});
});
Template.channel.helpers({
    private: function() {
        if (this.private) {
            return "private";
        }
    },

    canAccessChannel: function(){
        var channelName= this.name;
        var teamId = currentTeamId();
        var channelId = getChannelId(channelName, currentTeamId());

       // console.log("nochmal rendering mit + " + Perm.JOIN_PRIVATE_CHANNEL + " + " + channelId + " + " + channelName);
        Meteor.call('hasChannelPermission', Perm.JOIN_PRIVATE_CHANNEL,  currentTeamId(),  User.id(), channelId, function(err, canJoin) {
            if (canJoin) {
                Session.set(channelName, true);
            } else {
                Session.set(channelName, false);
            }
        });
       if(Session.get(this.name)){
            return this.name;
        }else{
            return ""
        }
    }
});

Template.channel.events({
   'click a': function(e, tmpl){
       if(Session.get(e.target.innerHTML) === false){
           Materialize.toast("no Access", 4000, "error");
       }
   }
});
