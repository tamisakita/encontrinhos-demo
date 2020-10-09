const eventsSearchInput = document.querySelector('#eventsSearch');

eventsSearchInput.oninput = async (event) => {
  if (event.target.value.length > 0) {
    const requestURL = `http://localhost:3000/api/events/${event.target.value}`;

    const response = await axios.get(requestURL);

    console.log(response.data.events);

    const tr = document.getElementById('table-body');
    tr.innerHTML = '';

    response.data.events.forEach(oneEvent => {
      tr.innerHTML += `
      <tr id="events-info">
        <td>{{this.date}}</td>
        <td>{{this.time}}</td>
        <td>
          <a href="/eventPageView/{{this._id}}/${oneEvent._id}">${oneEvent._id}</a> 
          </td>
        <td>{{this.owner.name}}</td> 

        <td>
        <div class="registered-button"> {{!-- imagem do botão inscrito --}}
            <button id="registered-button" type="button" name="Inscrito">
                {{!-- criar uma ação de remoção da inscrição --}} 
                </button>
          </div>
        </td>
      </tr>
      `
    });
  }
}

console.log(eventsSearchInput);
