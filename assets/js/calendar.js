const colorList = [
    "red", "pink", "deep-purple", "indigo", "green", "teal", "deep-orange", "amber"
]

function getColorIndex(str){
    let index = 0;
    for (let i = 0; i < str.length; i++) {
        let m = (str.charCodeAt(i))%(colorList.length);
        index += Math.pow(m,i+1)
    }
    index = index%(colorList.length)
    return index
};

function formatEventTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false
    })
};

function pushEvents(data, eventsArray) {
    data.map((e)=>{
        let color = colorList[getColorIndex(e.user)];
        eventsArray.push(
            Object.assign(e, {
                color: color
            })
        );       
    });
};

export {
    formatEventTime,
    pushEvents,
};