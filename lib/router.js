Router.route("/", {
    name: "Activity Monitor",
    template:'tmpActivityMonitor',
    progress: {
        enabled: true
    }
});
/*
 Router.route("/product/add", {
 name: "addProduct",
 template:'tmpAddProduct',
 progress: {
 enabled: true
 },
 onBeforeAction: function () {
 if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), ['admin'])) {
 Router.go('/');
 }
 else {
 this.next(); // Render the editor page
 }
 }
 });
 */
