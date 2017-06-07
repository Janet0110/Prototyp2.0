/*Handling der Events, die an ein Element gebunden werden*/
Template.newUserDialog.events({
    /*Schließt das Dialogfenster*/
    'click .close': function(e, tmpl){
        dialogHide();
    },
    /*Form-Submit für das Einladen eines Benutzers durch die E-Mail-Adress*/
    'click .submit': function(e, tmpl){
        var team = currentTeam();
        var to = $('.inputValue').val();
        var from = "JanetRahn@msn.com";
        var subject = "Invite for ChatApp in Team " + currentTeam().name;
        var text = "test ";

        Meteor.call("team.invite", User.id(), team, to, from, subject, text, function(err) {
            if (!err) {
                Materialize.toast("Sent invitation", 4000, "success");
            } else {
                Materialize.toast(err.message, 4000, "error");
            }
        });
        $('.inputValue').val("");
        dialogHide();
    }
});
/*Funktion für das Schließen des Dialogfensters*/
var dialogHide = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.newUser.set(false);
};