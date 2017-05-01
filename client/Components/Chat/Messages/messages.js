Template.messages.helpers({
    messages: Messages.find({})
});

Template.messages.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('messages', Session.get('channel'));
    });
});