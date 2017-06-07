/*Server-Anagben für den Email-Service sind hier vorzunehmen*/
if (Meteor.isServer) {
    Meteor.startup(function () {
        process.env.MAIL_URL = "smtp://EMAIL:PASSWORD@smtp.live.com:587";
        process.env.ROOT_URL = "http://localhost:3000";
    })
}
