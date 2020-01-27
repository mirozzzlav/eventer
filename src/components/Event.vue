<template>
  <router-link :to="{ name: 'Event Detail', params: {id: id}}" 
      class="col-lg-3 col-md-6 mb-4 event">
    <div class="card">
      <img class="card-img-top" v-bind:src="thumbnail" :alt="title">
      <div class="card-body py-3">
        <p class="card-title mb-1 h5">{{title}}</p>
        <p class="card-text">{{shortDesc}}</p>
      </div>
      <div class="card-footer bg-transparent">
        <p class="mb-0 font-weight-light">{{place}}</p>
        <p class="event-date py-0 mb-1 font-weight-light small">{{eventDateFormatted}}</p>
      </div>
    </div>
  </router-link>
</template>

<script>

import DateTimeHelper from '../helpers/DateTimeHelper'
export default {
  name: 'Event',
  props: {
    eventRawObject: Object,
  },
  data: function() {
    return {};
  },
  methods: {
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
    Object.keys(this.eventRawObject).forEach((key) => {
      this[key] = this.eventRawObject[key]; 
    });
  }
}
</script>

<style lang="scss">

@import '../scss/_variables';

a.event { 
  color: gray("800");
  &:hover {
    text-decoration: none !important;
    border: 0;
    color: gray("800");
  }
  .event-date {
    color:$custom-red;
  }
  .card {
    border: 0;
    box-shadow: 0 16px 64px -16px rgba(46,55,77,.1);
    -webkit-box-shadow: 0 16px 64px -16px rgba(46,55,77,.25);
  } 
  .card:hover {
    box-shadow: 0 16px 64px -16px rgba(46,55,77,.24);
    -webkit-box-shadow: 0 16px 64px -16px rgba(46,55,77,.44);
  }
}


</style>
