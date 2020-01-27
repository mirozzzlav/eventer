<template>
     <div class="container mb-4" v-if="eventExists">
        <h1 class="mb-4 h2">Event title</h1>
        <router-link :to="{ name: 'All Events'}" class="pb-3 link2">
            <span class="icon-wrapper"><b-icon-box-arrow-left></b-icon-box-arrow-left></span>
            Back to Events
        </router-link>
        <div class="mt-3">
            <img class="event-detail-img" v-bind:src="img" :alt="title">
        </div>
        <p class="mt-3" id="eventDetailDesc">{{desc}}</p>
        <p class="mb-0">
            <span class="font-weight-bold">{{place}}</span><br />
            <span class="font-weight-light event-date">{{eventDateFormatted}}</span>
        </p>
    </div>
    <div class="container mb-4 text-center" v-else>
        <p class="font-weight-light">404 - Event could not be found.</p>
    </div>
</template>

<script>
import DateTimeHelper from '../helpers/DateTimeHelper'
import Api from '../pseudoAPI/Api.js'

export default {
  name: 'EventDetail',
  props: {
      eventRawObject: Object,
  },
  computed: {
    eventDateFormatted: function() {
      if (this.eventDate) {
        return DateTimeHelper.getDateFormatted(this.eventDate);
      }
      return "";
    }
  },
  created: function() {
    let id = (this.$route.params.id || -1);
    let eventRawObject = Api.getEvent(id);
    
    if (eventRawObject === null) {
        this.eventExists = false;
        return;
    }
    this.eventExists = true;

    Object.keys(eventRawObject).forEach((key) => {
      this[key] = eventRawObject[key]; 
    });
  },
  
}
</script>

<style lang="scss">
.event-detail-img {
    max-height: 300px;
    width: auto;
}
#eventDetailDesc {
    text-align: justify;
}
.event-date {
    color:$custom-red;
}
</style>
