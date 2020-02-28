<template>
  <div class="container mb-4">
      <h1 class="mb-4 h2">Event title</h1>
      <router-link :to="{ name: 'All Events'}" class="pb-3 link2">
          <span class="icon-wrapper"><b-icon-box-arrow-left></b-icon-box-arrow-left></span>
          Back to Events
      </router-link>
      <div v-if="!dataFetched" class="text-center mt-3">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
      <div v-if="eventExists && dataFetched">
        <div class="mt-3">
            <img class="event-detail-img" v-bind:src="img" :alt="title">
        </div>
        <p class="mt-3" id="eventDetailDesc">{{desc}}</p>
        <p class="mb-0">
            <span class="font-weight-bold">{{place}}</span><br />
            <span class="font-weight-light event-date">{{eventDateFormatted}}</span>
        </p>
      </div>
      <p class="font-weight-light text-center mt-3" v-if="!eventExists && dataFetched">404 - Event could not be found.</p>    
  </div>
</template>

<script>
import DateTimeHelper from '../helpers/DateTimeHelper'

export default {
  name: 'EventDetail',
  props: {
  },
  data:  function() {
    return {
      eventExists: null,
      dataFetched: false
    }
  },
  computed: {
    eventDateFormatted: function() {
      if (this.eventDate) {
        return DateTimeHelper.getDateFormatted(this.eventDate);
      }
      return "";
    }
  },
  watch: {
    $route: {
      immediate: true, 
      handler: function() {
        const apiUrl = `${process.env.VUE_APP_BASE_ROUTE}/api/${this.$route.path}`;   
        setTimeout(() => {
            this.$http.get(apiUrl).then((response)=> {
                const {data} = response;
                this.dataFetched = true;
                if (!data.id) {
                  this.eventExists = false;
                  return;
                }
                this.eventExists = true;
                Object.keys(data).forEach((key) => {
                  this[key] = data[key]; 
                });
            });
        }, 1500);
      }
    }
  }
  
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
