Template.createChannelDialog.onCreated(function(){
    this.private = new ReactiveVar(false);
});

Template.createChannelDialog.helpers({
    private: function(){
        return Template.instance().private.get();
    }
});

Template.createChannelDialog.events({
    'click .close': function(e, tmpl){
        dialogHide();
    },
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

    'change .checkboxPrivate': function(e, tmpl){
        var private = ($('input:checkbox[name=channel]:checked').val() === "on");
        tmpl.private.set(private);
    }
});

var dialogHide = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.show.set(false);
};