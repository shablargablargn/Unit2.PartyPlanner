const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events`;

const state = {
 events: [],
}

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);


async function render() {
    await getEvent();
    CanvasRenderingContext2D();
}
render();

async function getEvent() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      state.events = json.data;
    } 
    catch (error) {
      console.error(error);
    }
  }

  function renderEvent() {
    if (!state.events.length) {
      eventList.innerHTML = "<li>No events.</li>";
      return;
    }
  
    const eventCards = state.events.map((event) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.date}</p>
        <p>${event.time}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
      `;
      return li;
    });
  
    eventList.replaceChildren(...eventCards);
  }

  async function addEvent(event) {
    event.preventDefault();
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addEventForm.name.value,
          date: addEventForm.date.value,
          time: addEventForm.time.value,
          location: addEventForm.location.value,
          description: addEventForm.description.value,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
  
      render();
    } catch (error) {
      console.error(error);
    }
  }