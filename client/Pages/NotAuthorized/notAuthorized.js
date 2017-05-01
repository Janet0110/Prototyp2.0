Template.notAuthorized.events({
    'click .link': function(e,t){
        FlowRouter.go('channel', { team: Session.get("team"), channel: 'general' });
    }
});