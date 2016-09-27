query = {};
varLimit= new ReactiveVar(10);
varSkip=new ReactiveVar(0);

Template.tmpActivityMonitor.created=function(){
    this.subscribe("getActivity",query,varLimit.get(),varSkip.get());
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