import events from "./events.json";

const DEFAULTS = {
    thumbnail: "http://www.aal-europe.eu/wp-content/uploads/2013/04/events_medium.jpg",
    img: "http://www.aal-europe.eu/wp-content/uploads/2013/04/events_medium.jpg",
};

class EventsApi {
    constructor() {
        
        if (localStorage && localStorage.getItem('events')) {
            this.events = JSON.parse(localStorage.getItem('events'));
        } else {
            this.events = {};
            Object.values(events).forEach(event=>{
                let sanitizedEvent = this.sanitizeEvent(event);
                this.events[sanitizedEvent.id] = sanitizedEvent;
             });
             localStorage.setItem('events', JSON.stringify(this.events));
        }
    }

    sanitizeEvent(event) {
        let sanitizedEvent = {};
        if (!event.id) {
            event.id = this.getNewId();
        }
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
    getNewId() {
        if (!this.events) {
            throw "No events were initialized.";
        }
        let lastId = Object.keys(this.events).pop();
        if (lastId && !isNaN(lastId)) {
            return (parseInt(lastId) + 1) + "";
        }
        return "1";
    }

    addEvent(event) {
        let emptyEvent = {
            "id": null, "title": "", "shortDesc": "", "desc": "", "place": "", 
            "eventDate": "", "thumbnail": "", "img": "" 
        }
        event = Object.assign(emptyEvent, event);
        event = this.sanitizeEvent(event);

        this.events[event.id] = event;
        //localStorage.setItem('events', JSON.stringify(this.events));
    }
}


export default new EventsApi();