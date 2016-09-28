Meteor.publish('getActivity', function(query ,limit) {
    return events.find(query,{limit:limit, sort: { ts: -1}});
});