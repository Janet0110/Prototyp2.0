/*reaktive Variable wird initialisiert bei der Erstellung des Templates, für das Erstellen eines privaten Channels*/
Template.createChannelDialog.onCreated(function(){
    this.private = new ReactiveVar(false);
});
/*Helpers für die Verwendung im Template*/
Template.createChannelDialog.helpers({
    /*Holt sich von der Instanz den Wert private. Wird auf true gesetzt wenn der Haken bei Privat im Dialog gesetzt wurde*/
    private: function(){
        return Template.instance().private.get();
    }
});
/*Handling der Events, die an ein Element gebunden werden*/
Template.createChannelDialog.events({
    /*schließt das Dialogfenster*/
    'click .close': function(e, tmpl){
        dialogHide();
    },
    /*Form-Submit, für das Erstellen eines neuen Channels*/
    'click .submit': function(e, tmpl){
        var channelname = $('.inputValue').val();

        var teamId = currentTeamId();
        var channelName = channelname;
        var private = tmpl.private.get();


        Meteor.call('channels.add', teamId, channelName, private, function(err){
            if(err){
                Materialize.toast(err.message, 4000, "error");
            }else{
                Materialize.toast("Channel created", 4000, "success");
            }
        });
        $('.inputValue').val("");
        dialogHide();
    },
    /*aktualisiert den Wert, wenn Checkbox Private angeklickt wurde*/
    'change .checkboxPrivate': function(e, tmpl){
        var private = ($('input:checkbox[name=channel]:checked').val() === "on");
        tmpl.private.set(private);
    }
});

/*Schließt das Dialogfenster - keine optimale Lösung*/
var dialogHide = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.show.set(false);
};