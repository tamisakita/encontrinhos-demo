const eventsSearchInput = document.querySelector('#eventsSearch');

eventsSearchInput.oninput = async (event) => {
  const requestURL = `http://localhost:3000/api/events?name=${event.target.value}`;

  const response = await axios.get(requestURL);

  console.log(response.data);

  const tr = document.getElementById('table-body');
  tr.innerHTML = '';

  response.data.events.forEach((oneEvent) => {
    tr.innerHTML += `
    <tr id="events-info">
    <td>
    <div class="registered-button"> 
        <button id="registered-button" type="button" name="Inscrito">Inscreva-se</button>
    </div>
    </td>
      <td>${oneEvent.date}</td>
      <td>${oneEvent.time}</td>
      <td>
        <a href="/eventPageView/${oneEvent._id}">${oneEvent.name}</a> 
        </td>
      <td>${oneEvent.owner ? oneEvent.owner.name : ''}</td> 
    </tr>
    `
  });
}

// console.log(eventsSearchInput);
