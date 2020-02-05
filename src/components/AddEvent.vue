<template>
    <b-modal v-bind:id="modalId" title="Add new event" button-size="sm" ok-title="Submit"
        @ok="handleOkButton"
    >
        <b-form @submit="submitEvent" @submit.stop.prevent="submitEvent" 
            id="add-event-form" ref="addEventForm"
        >
            <b-form-input id="event-title" v-model="form.title" type="text" required
                placeholder="Event Title" :state="formStates.title"
            >
            </b-form-input>

            <b-form-input id="event-shortDesc" v-model="form.shortDesc" type="text" required 
                placeholder="Short description" :state="formStates.shortDesc"
            >
            </b-form-input>
            <b-form-textarea id="event-desc" v-model="form.desc" type="text" required 
                placeholder="Longer description" :state="formStates.desc"
            >
            </b-form-textarea>
            <b-form-input id="event-place" v-model="form.place" type="text" required 
                placeholder="Event venue" :state="formStates.place"
            >
            </b-form-input>
            <b-form-input id="event-eventDate" v-model="form.eventDate" type="text" required 
                placeholder="Event date" :state="formStates.eventDate"
            >
            </b-form-input>
            <b-form-input id="event-img" v-model="form.img" type="text" 
                placeholder="Image URL" :state="formStates.img"
            >
            </b-form-input>
        </b-form>
        <div class="alert alert-warning" v-show="showValidationWarning">
            <strong>Warning!</strong> Some inputs are not valid.
        </div>
    </b-modal>  
    
</template>

<script>

//import DateTimeHelper from '../helpers/DateTimeHelper'

export default {
  name: 'AddEvent',
  props: {
      modalId: String
  },
  data: function() {
    return {
        form: {
        },
        formStates: {
            title: null,
        },
        showValidationWarning: false
    };
  },
  methods: {
      checkFormValidity() {
        var valid = true;

        this.$refs.addEventForm.children.forEach(
            (val) => {
                let formStateId = val.id.replace("event-", "");
                this.formStates[formStateId] = val.checkValidity();
                if (!this.formStates[formStateId]) {
                    valid = false;
                }
            }
        );
            
        return valid
      },
      resetModal() {
        Object.keys(this.form).forEach((inputName) => {
            this.form[inputName] = "";
        });
        Object.keys(this.formStates).forEach((key) => {
            this.formStates[key] = false;
        });
        this.showValidationWarning = false;
      },

      submitEvent: function() {
           // Exit when the form isn't valid
            this.showValidationWarning = false;
            if (!this.checkFormValidity()) {
                this.showValidationWarning = true;
                return
            }
            
            //Api.addEvent(this.form);
            //this.$emit('eventadded');

      },

      handleOkButton(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.submitEvent()
      },
  },
  computed: {
    
  },
  created: function() {    
    
  }
}
</script>

<style lang="scss">
@import '../scss/_variables';
.form-control {
    margin-bottom: 0.5rem;
}

</style>
