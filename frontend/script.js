const form = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    const ticket = document.createElement("div");
    ticket.className = "ticket";

    ticket.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <strong>Priority: ${priority}</strong>
        <p>Status: Open</p>
    `;

    ticketList.appendChild(ticket);

    form.reset();
});