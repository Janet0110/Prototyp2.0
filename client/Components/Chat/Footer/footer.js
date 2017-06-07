Template.footer.events({
    /*speichert Text in Variable und überprüft ob die Eingabetaste für das Absender der Nachricht gedrückt wurde, um die Nachricht abzusenden*/
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
    /*sendet den eingegebenen Text in aktuellen Team und Channel*/
    'click .sendButton': function(event){
        event.stopPropagation();
        var inputVal = $('.inputText').val();
        sendMessage(currentChannelId(), inputVal, User.id(), currentTeamId(), Date.now());
        $('.inputText').val("");
    }

});

/*Funktion für das Senden der Nachricht*/
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