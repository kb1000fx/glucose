const DAY = 86400000;
var faker = require('faker');
var lodash = require('lodash');
faker.locale = "zh_CN";
var fullName = faker.name.lastName() + faker.name.firstName();

function getFormatDate(time) {
    return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}

module.exports = () => {
    return {
        login: {
            token: "token",
            user: fullName,
        },
        user: {
            user: fullName,
            avatar: faker.image.people()
        },
        userID: {
            isUsed: true
        },
        notice: {
            autoShow: false,
            content: faker.lorem.sentence()
        },
        detail: {
            events: lodash.times(8, (n)=>{
                let now = Date.now();             
                let endTime = startTime = new Date(faker.date.between(new Date(now-864000000), new Date(now+864000000)));
                endTime = new Date(endTime.getTime() + faker.random.number(0.5*DAY, 5*DAY)) 
                return {
                    user: faker.name.lastName() + faker.name.firstName(),
                    start: getFormatDate(startTime),
                    end: getFormatDate(endTime),
                    material: faker.lorem.words(),
                    temperature: faker.random.number()%1538,
                }
            }),
            titles: [
                { label: '预约人', name: 'user' },
                { label: '开始时间', name: 'start' },
                { label: '结束时间', name: 'end' },
                { label: '材料', name: 'material' },
                { label: '温度', name: 'temperature' },
            ],
        },
        itemList: [
            {
                tab: '列表1',
                list: ["设备1", "设备2", "设备3", "设备4", "设备5"]
            },
            {
                tab: '列表2',
                list: ["设备6", "设备7", "设备8", "设备9", "设备10"]
            }
        ],

    }
}