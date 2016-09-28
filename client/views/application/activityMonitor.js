query = {};
varLimit= new ReactiveVar(10);
varPerPage=new ReactiveVar(10)
varTotalRecord = new ReactiveVar(0);

Template.tmpActivityMonitor.created=function(){
    Tracker.autorun(function() {
        Meteor.call("getTotalRecords",function(err,response){
            if(!err && response)
                varTotalRecord.set(response);
        })
        Meteor.subscribe("getActivity",query,varLimit.get());
    });
}

Template.tmpActivityMonitor.rendered=function() {
    var element = $('.eventMain');
    element.scroll(function() {
        if(hasMoreData()) {
            if ($(this).scrollTop() > 0 && ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight)) {
                loadMoreEvents();
            }
        }
    });

    element.slimScroll({
        size: '5px',
        height: '400',
        color: '#3757ff',
        railVisible: true,
        alwaysVisible: true,
        distance: '20px',
        railColor: '#eaf4ff',
        railOpacity: 0.7
    });
}

function loadMoreEvents(){
    var currentLimit =0;
    currentLimit= (varLimit.get() + varPerPage.get());
    varLimit.set(currentLimit);
}

function hasMoreData(){
    return varTotalRecord.get() > varLimit.get();
}

Template.tmpActivityMonitor.helpers({
    getEvents:function () {
        return events.find();
    },
    getTemplate:function (type){
        if(type=="ota_event")
            return  'tempOTAEvents';
        if(type=="water_use")
            return  'tempWaterUseEvents';
        if(type=="time_limit")
            return  'tempTimeLimitEvents';
    }
})

Template.tempOTAEvents.created=function(){
    if(this.data && this.data.success)
        this.flagOTAUpdateSucceed =isOTAUpdateSucceed(this.data.success);
}

Template.tempOTAEvents.helpers({
    isOTAUpdateSucceed:function (isSucceed) {
        return Template.instance().flagOTAUpdateSucceed  ? "OTA Update succeed" : "OTA Update failed"
    },
    classOTAUpdateSucceed:function (isSucceed) {
        return Template.instance().flagOTAUpdateSucceed  ? "success" : "fail"
    }
})

Template.tempWaterUseEvents.created=function(){
    if(this.data && this.data.ts) {
        this.timeStamp =  this.data.ts.t1 - this.data.ts.t0;
    }
}
Template.tempWaterUseEvents.helpers({
    getDifference:function (isSucceed) {
        return Template.instance().timeStamp;
    }
})

function isOTAUpdateSucceed (isSucceed){
    return isSucceed;
}

getFormattedDate=function(date){
    debugger;
    var today = new Date();
    if(moment(today).format("L") ==  moment(date).format("L"))
        return  moment(date).startOf('hour').fromNow();
    else
        return moment(date).format('L') + "," + moment(date).format('LT');
}
UI.registerHelper('getDate', getFormattedDate);