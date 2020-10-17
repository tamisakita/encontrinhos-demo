const eventsSearchInput = document.querySelector('#eventsSearch');

eventsSearchInput.oninput = async (event) => {
  const requestURL = `${process.env.URL_BASE}/api/events?name=${event.target.value}`;

  const response = await axios.get(requestURL);

  response.data.events.forEach(event => {
    event.currentParticipant = event.participantsId.includes(document.getElementById("current-user").value); //testar se o ID do nosso usuário logado existe dentro do participantsId
  });

  const tr = document.getElementById('table-body');
  tr.innerHTML = '';

  // console.log(sessionStorage.currentUser, 'oláaaaaaaa');

  response.data.events.forEach((oneEvent) => {
    const button = `
      <form action="/home/${oneEvent._id}" method="get">
        <button id="button-to-register" name="register-button" value="Inscrever" type="submit">Inscrever-se</button>
      </form>
    `;

    const registered = "<p>Já inscrito</p>";

    tr.innerHTML += `
    <tr id="events-info-${oneEvent._id}">
    <td>
    <div class="registered-button"> 
      ${oneEvent.currentParticipant ? registered : button}
    </div>
    </td>
      <td>${oneEvent.date}</td>
      <td>${oneEvent.time}</td>
      <td>
        <a id="event-name" href="/eventPageView/${oneEvent._id}">${oneEvent.name}</a> 
        </td>
      <td>${oneEvent.owner ? oneEvent.owner.name : ''}</td> 
    </tr>
    `
  });
}

// console.log(eventsSearchInput);
// oiii
