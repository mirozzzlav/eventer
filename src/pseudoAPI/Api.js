import events from "./events.json";

const DEFAULTS = {
    thumbnail: "http://www.aal-europe.eu/wp-content/uploads/2013/04/events_medium.jpg",
    img: "http://www.aal-europe.eu/wp-content/uploads/2013/04/events_medium.jpg",
};

class EventsApi {
    constructor() {
  
        this.events = {};
      
        events.forEach(event => {
            let sanitizedEvent = this.sanitizeEvent(event);
            this.events[sanitizedEvent.id] = sanitizedEvent;
        });        
    }

    sanitizeEvent(event) {
        let sanitizedEvent = {};
        Object.keys(event).forEach(key => {
            if (!event[key]) {
                sanitizedEvent[key] = DEFAULTS[key] || "";
            } else {
                sanitizedEvent[key] = event[key];
            }
        });
        return sanitizedEvent;
    }
    
    getEvents() {
        return this.events;
    }

    getEvent(id) {
        return this.events[id] || null;
    }
}


export default new EventsApi();