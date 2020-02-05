<template>  
    <div class="container mb-4" @eventadded="setApiData()">
        <h1 class="mb-3 h2">Events</h1>
        <b-navbar toggleable="lg" type="light" class="mb-1 px-0">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" class="my-0 vertical-flex" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{name:'All Events'}" class="mr-2">
                        All Events
                    </b-nav-item>
                    <b-nav-item :to="{name: 'Events', params: {type: 'past', period: 'any'}}" class="mr-2"
                        v-bind:class="{ 'custom-active-parent' : routeParams.type === 'past'}"
                    >
                        Past
                    </b-nav-item>
                    <b-nav-item :to="{name: 'Events', params: {type: 'upcoming',  period: 'any'}}"
                        v-bind:class="{ 'custom-active-parent' : routeParams.type === 'upcoming'}"
                    >
                        Upcoming
                    </b-nav-item>
                </b-navbar-nav>
                
                <b-nav class="sub-nav mt-2" v-if="routeParams.period">
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'today'}}" 
                        v-if="routeParams.type ==='upcoming'"
                    >
                        Today
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'1_week'}}">
                        {{periodSign}}1 Week
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'2_weeks'}}">
                        {{periodSign}}2 Weeks
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'1_month'}}">
                        {{periodSign}}1 Month
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'3_months'}}">
                        {{periodSign}}3 Months
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'6_months'}}">
                        {{periodSign}}6 Months
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: routeParams.type, period:'any'}}">
                        Any period
                    </b-nav-item>
                </b-nav>  

            </b-collapse>
        </b-navbar>
        <b-button v-b-modal.add-event-modal size="sm" variant="primary">Add new event</b-button>
        <addEvent :modalId = "'add-event-modal'" @eventadded="setApiData" />

        <div class="row text-center mt-4" v-if="events.length">
            <event v-for="event in events" :key="event.id" :eventRawObject="event"></event>
        </div>
        <div class="text-center mt-4" v-else>
            <p class="font-weight-light pt-4">No Events found for selected filter.</p>
        </div>
        
    </div>
</template>

<script>
import Event from './Event.vue';
import AddEvent from './AddEvent.vue';
import DateTimeHelper from '../helpers/DateTimeHelper';
export default {
    components: { Event, AddEvent },
    name: 'EventsList',
    data: function() {
        return {
            apiData: {}
        }
    },
    computed: {
        events: function (){
            let events = this.apiData;/*.filter(
                (event) => {
                    return this.filterEvent(event);
                }
            );*/
            return events/*.sort((event1, event2) => {
                if (this.routeParams.type == 'past') {
                    return DateTimeHelper.compareDates(event2.eventDate, event1.eventDate);
                }
                return DateTimeHelper.compareDates(event1.eventDate, event2.eventDate);
            });*/
        },
        routeParams: function() {
            return this.$route.params;
        },
        periodSign: function() {
            return this.routeParams.type === 'upcoming' ? '+' : '-';
        },
        
    },
    methods: {
        filterEvent(event) {
            var period = this.routeParams.period, condition = false; 
            if (this.routeParams.type === "past") {
                condition = DateTimeHelper.compareGivenDateToCurrentDate(event.eventDate) < 0;
                if (period !== 'any') {
                    condition = condition && 
                        DateTimeHelper.compareGivenDateToCurrentDateAdaptedByPeriod(event.eventDate, this.periodSign, period) >= 0;
                }  
            }
            else if (this.routeParams.type === "upcoming") {
                condition = DateTimeHelper.compareGivenDateToCurrentDate(event.eventDate) >= 0;
                if (period !== 'any' && period !== "today") {
                    condition = condition && DateTimeHelper.compareGivenDateToCurrentDateAdaptedByPeriod(event.eventDate, this.periodSign, period) < 0;
                }
                if (period === 'today') {
                    condition = DateTimeHelper.compareGivenDateToCurrentDate(event.eventDate, true) === 0
                }
            } else {
                condition = true;
            }
            return condition;
        },
        async setApiData() {
            const { data } = await this.$http.patch(
                process.env.VUE_APP_BASE_ROUTE + '/api/events-list/all',
            );
    
            this.apiData = data;
        }        
        
        
    },
    created: function() {
        this.setApiData();
    }    
    

}

</script>