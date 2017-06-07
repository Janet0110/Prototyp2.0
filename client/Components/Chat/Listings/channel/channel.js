/*Wird Template erstellt, wird eine reaktive Variable initialisiert*/
Template.channel.onCreated(function(){
    this.canJoin = new ReactiveVar({channel: null, canAccess: null});
});
/*Helpers für die Verwendung im Template*/
Template.channel.helpers({
    /*Überprüft, ob es sich um einen privaten Channel handelt*/
    private: function() {
        if (this.private) {
            return "private";
        }
    },
    /*Überprüft, ob der Benutzer den Channel betreten darf*/
    canAccessChannel: function(){
        var channelName= this.name;
        var teamId = currentTeamId();
        var channelId = getChannelId(channelName, currentTeamId());

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
/*Handling der Events, die an ein Element gebunden werden*/
Template.channel.events({
    /*Lässt eine Meldung erscheinen, wenn der Zutritt in den Channel nicht erlaubt wird*/
   'click a': function(e, tmpl){
       if(Session.get(e.target.innerHTML) === false){
           Materialize.toast("no Access", 4000, "error");
       }
   }
});
