
Router.configure({
    layoutTemplate: "layout"
});


Router.route("/", {
    name: "Activity Monitor",
    template:'tmpActivityMonitor',
    progress: {
        enabled: true
    }
});
