<template>
<v-row class="fill-height">
    <v-col>
        <v-sheet class="d-flex align-center justify-space-between" height="64">
            <div class="quarter-wrap">
                <v-select
                    v-model="calendar.type"
                    :items="types"
                    item-text="zh"
                    item-value="type"
                    dense
                    outlined
                    hide-details
                    class="ma-2"
                    label="类型"
                ></v-select>
            </div>
            <div class="half-wrap">
                <v-btn fab text color="grey darken-2" @click="prevMonth()">
                    <v-icon> fas fa-chevron-left </v-icon>
                </v-btn>
                <v-toolbar-title v-html="$refs.calendar.title" v-if="calendar.title"></v-toolbar-title>
                <v-btn fab text color="grey darken-2" @click="nextMonth()">
                    <v-icon> fas fa-chevron-right </v-icon>
                </v-btn>
            </div>
            <div class="quarter-wrap">
                <v-btn depressed color="primary" @click="createNew()"> create </v-btn>
            </div>
        </v-sheet>
        <v-sheet  class="fill-height">
            <v-calendar
                ref="calendar"
                event-overlap-mode="column"
                :type="calendar.type"
                v-model="calendar.value"
                :weekdays="calendar.weekday"
                :events="events"
                :color="calendar.color"
                :event-height="eventHeight"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
            >
                <template v-slot:event="{ event }">
                    <div class="calendar-events d-flex align-center">
                        <div class="events-start d-none d-md-flex">
                            {{ formatEventTime(event.start) }}
                        </div>
                        <div class="events-user">
                            {{ event.user }}
                        </div>
                    </div>
                </template>
            </v-calendar>

            <v-menu
                v-model="calendar.selectedOpen"
                :activator="calendar.selectedElement"   
                :close-on-content-click="false"  
                offset-y
            >
                <v-card min-width="260px" flat>
                    <v-toolbar :color="calendar.selectedEvent.color" dark>
                        <v-btn icon @click="editEvent()">
                            <v-icon>fas fa-pencil-alt</v-icon>
                        </v-btn>
                        <v-toolbar-title v-html="calendar.selectedEvent.user"></v-toolbar-title>  
                        <v-spacer></v-spacer>
                        <v-btn icon @click="deleteEvent()">
                            <v-icon>fas fa-trash-alt</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                            v-for="(e,i) in eventsTitle"
                            :value="calendar.selectedEvent[e.name]"
                            :label="e.label"
                            :key="e.name"
                            readonly
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                        <v-btn depressed color="primary" @click="submitChange()"> 应用 </v-btn>
                        <v-btn depressed color="primary" @click="closeDialog()"> 关闭 </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-sheet>
    </v-col>
</v-row>
</template>

<script>
import { formatEventTime, pushEvents, } from "@js/calendar.js";

export default {
    layout: 'main',
    components: {
        
    },
    methods:{
        formatEventTime,
        showEvent: function ({ nativeEvent, event }) {
            this.calendar.selectedEvent = event;
            this.calendar.selectedElement = nativeEvent.target;
            setTimeout(() => {
                this.calendar.selectedOpen = true
            }, 10);
            nativeEvent.stopPropagation()
        },
        editEvent: function () {
            
        },
        deleteEvent: function () {
            
        },
        closeDialog: function () {
            this.calendar.selectedOpen = false
        },
        submitChange: function () {
            
        },
        prevMonth: function () {
            this.$refs.calendar.prev()
        },
        nextMonth: function () {
            this.$refs.calendar.next()
        },
        createNew: function () {
            this.calendar.selectedElement = null;
            this.calendar.selectedEvent = {};
            this.calendar.selectedOpen = true;
        },
        viewDay: function () {
            this.calendar.type = 'day'
        },

    },
    data: ()=>{
        return {
            calendar: {
                title: false,
                value: null,
                weekday: [1, 2, 3, 4, 5, 6, 0],
                color: "primary",
                selectedEvent: {},
                selectedElement: null,
                selectedOpen: false,
                type: 'month',
            },
            events: [],
            types: [ {zh: '月', type: 'month'}, {zh: '日', type: 'day'}, ],
            eventsTitle: [],
        }
    },
    computed: {
        eventHeight: function () {
            if (this.$vuetify.breakpoint.lgAndUp) {
                return 28
            } else {
                return 20
            }
        },
    },
    async fetch(){
        const res = await this.$axios.get('/detail');
        this.eventsTitle = res.data.titles;
        pushEvents(res.data.events, this.events);
    },
    mounted: function (){
        this.calendar.title = true;
    }
}
</script>

<style lang="scss" scoped>
.calendar-events{
    font-size: 16px;
    height: 100%
}
.events-user{
    margin: auto;
}
.events-start{
    margin-left: 5px
}
.quarter-wrap{
    display: flex;
    width: 25%;
    max-width: 240px;
    justify-content: center;
    align-items: center;
    & span{
        font-size: 24px
    }
}
.half-wrap{
    display: flex;
    width: 50%;
    max-width: 480px;
    justify-content: center;
    align-items: center;
}
</style>