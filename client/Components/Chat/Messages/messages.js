/*Helpers für die Verwendung im Template*/
Template.messages.helpers({
    messages: Messages.find({})
});

/*registriert sich an der Metepr-Publish-Methode für den Erhalt der Nachrichten im Channel*/
Template.messages.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('messages', Session.get('channel'));
    });
});
