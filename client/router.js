FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
        redirect('/login');
    }]
});

FlowRouter.route('/login', {
    action: function() {
        BlazeLayout.render("blankLayout", {content: "login"});
    }
});

FlowRouter.route('/register', {
    action: function () {
        BlazeLayout.render("blankLayout", {content: "register"});
    }
});

FlowRouter.route('/teams', {
    name: 'teamList',
    subscriptions: function(params) {
        if(Meteor.userId()) {
            this.register('teams', Meteor.subscribe('myTeams', Meteor.userId()));
        }
    },
    action: function () {
        BlazeLayout.render("blankLayout", {content: "teams"});
    },
    triggersEnter: [function(context, redirect) {
        Session.set("team", "create");
    }],
    triggersExit:[function(context){
        Session.set('team', undefined);
    }]
});

FlowRouter.route('/team', {
    name: 'teamCreate',
    action: function () {
        BlazeLayout.render("blankLayout", {content: "teamCreate"});
    }

});

var teamGroup = FlowRouter.group({
    prefix: '/teams/:team',
    name:"team",
    subscriptions: function(params) {
        this.register('channels', Meteor.subscribe('teamChannels', params.team));
        this.register('teams', Meteor.subscribe('getTeamByName', params.team));
        this.register('usersInTeam', Meteor.subscribe('usersInTeam', params.team));
    },
    triggersEnter: [function(context, redirect) {
        var isInTeam =  (Teams.find({$and: [{_id: currentTeamId()}, {"users.user": User.id()}]}).count() == 1);
        Session.set("team", context.params.team);
    }],
    triggersExit:[function(context){
        if(Meteor.isClient){
            Session.set('team', undefined);
        }
    }]
});

teamGroup.route('/', {
    triggersEnter: [function(context, redirect) {
        redirect(context.path + "/channel/general")
    }]
});

teamGroup.route('/permissions', {
    name:"permissions",
    action: function () {
        BlazeLayout.render("adminLayout", {content: "permissions"});
    },
    subscriptions: function(params){
        this.register("roles", Meteor.subscribe('roles', Meteor.userId()));
        this.register("permissions", Meteor.subscribe('permissions', Meteor.userId()));
    },
    triggersEnter:[function(context, redirect, params){
        if(Meteor.userId()){
            Session.set("channel", "Permissions");
            Session.set("content", "admin");
        }
    }],
    triggersExit:[function(context){
        if(Meteor.isClient){
            Session.set('channel', undefined);
            Session.set("content", undefined);
        }
    }]
});

teamGroup.route('/userRoles', {
    name:"userRoles",
    action: function () {
        BlazeLayout.render("adminLayout", {content: "userRoles"});
    },
    subscriptions: function(params){
        this.register("roles", Meteor.subscribe('roles', Meteor.userId()));
        this.register('channels', Meteor.subscribe('usersChannelRoles', params.team));
        this.register('teamChannels', Meteor.subscribe('teamChannels', params.team));
        this.register('usersInTeam', Meteor.subscribe('usersInTeam', params.team));
    },
    triggersEnter:[function(context, redirect, params){
        if(Meteor.userId()){
            Session.set("channel", "User Roles");
            Session.set("content", "admin");
        }
    }],
    triggersExit:[function(context){
        if(Meteor.isClient){
            Session.set('channel', undefined);
            Session.set("content", undefined);
        }
    }]
});



teamGroup.route('/channel/:channel',{
    name:"channel",
    action: function () {
        BlazeLayout.render("mainLayout", {content: "messages"});
    },
    subscriptions: function(params){
        this.register("messages", Meteor.subscribe('channelMessages', params.channel, params.team));
    },
    triggersEnter:[function(context, redirect, params){
        if(Meteor.userId()){
            var currentRoute = FlowRouter.current();
            Session.set("channel", context.params.channel);
            var test = redirect;
        }
    }],
    triggersExit:[function(context){
        if(Meteor.isClient){
            Session.set('channel', undefined);
        }
    }]
});

FlowRouter.route('/invite/:inviteId', {
    name: 'invite',
    action: function (params) {
        BlazeLayout.render("blankLayout", {content: "invite"});
    }
});

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render("blankLayout", {content: "notFound"});
    }
};

