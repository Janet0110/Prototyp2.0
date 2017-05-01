Template.footer.events({
    'keypress input': function(event){

        var inputVal = $('.inputText').val();
        if(!!inputVal){
            var charCode = (typeof event.which == "number") ? event.which : event.keyCode;
            if (charCode == 13) {
                event.stopPropagation();
                sendMessage(currentChannelId(), inputVal, User.id(), currentTeamId(), Date.now());
                $('.inputText').val("");
                return false;
            }
        }
    },
    'click .sendButton': function(event){
        event.stopPropagation();
        var inputVal = $('.inputText').val();
        sendMessage(currentChannelId(), inputVal, User.id(), currentTeamId(), Date.now());
        $('.inputText').val("");
    }

});

var sendMessage = function(cannel, text, user, team, date){
    Messages.insert({
        // TODO: Meteor.call Aufruf
        channel: currentChannelId(),
        text: $('.inputText').val(),
        user: User.id(),
        team: currentTeamId(),
        date: Date.now()
    });
};