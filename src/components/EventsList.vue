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
                        v-bind:class="{ 'custom-active-parent' : $route.params.type === 'past'}"
                    >
                        Past
                    </b-nav-item>
                    <b-nav-item :to="{name: 'Events', params: {type: 'upcoming',  period: 'any'}}"
                        v-bind:class="{ 'custom-active-parent' : $route.params.type === 'upcoming'}"
                    >
                        Upcoming
                    </b-nav-item>
                </b-navbar-nav>
                
                <b-nav class="sub-nav mt-2" v-if="$route.params.period">
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'today'}}" 
                        v-if="$route.params.type ==='upcoming'"
                    >
                        Today
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'1_week'}}">
                        {{periodSign}}1 Week
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'2_weeks'}}">
                        {{periodSign}}2 Weeks
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'1_month'}}">
                        {{periodSign}}1 Month
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'3_months'}}">
                        {{periodSign}}3 Months
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'6_months'}}">
                        {{periodSign}}6 Months
                    </b-nav-item>
                    <b-nav-item :to="{name : 'Events', params: {type: $route.params.type, period:'any'}}">
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
//import DateTimeHelper from '../helpers/DateTimeHelper';
export default {
    components: { Event, AddEvent },
    name: 'EventsList',
    data: function() {
        return {
            events: {}
        }
    },
    computed: {
    },
    methods: {
    },
    watch: {
        $route: {
            immediate: true, 
            handler: function() {
                const apiUrl = `${process.env.VUE_APP_BASE_ROUTE}/api/${this.$route.path}`;
                this.$http.get(apiUrl).then((response)=> {
                    const {data} = response;
                    this.events = data;
                });
            }, 
        },
    }

}

</script>