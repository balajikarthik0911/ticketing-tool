import { useState } from "react";

function App() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Login issue",
      description: "Unable to log in to the account",
      status: "Open",
      priority: "High",
      category: "Technical"
    }
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  function createTicket(e) {
    e.preventDefault();

    if (!title || !description) return;

    const newTicket = {
      id: Date.now(),
      title,
      description,
      status: "Open",
      priority,
      category
    };

    setTickets([newTicket, ...tickets]);

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("General");
  }

  function changeStatus(id, status) {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Support Ticketing Tool</h1>
        <p>Create and manage support tickets</p>
      </header>

      <section className="create-section">
        <h2>Create Ticket</h2>

        <form onSubmit={createTicket}>
          <input
            type="text"
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>Technical</option>
            <option>Billing</option>
            <option>Account</option>
          </select>

          <button type="submit">Create Ticket</button>
        </form>
      </section>

      <section>
        <h2>Ticket Listing</h2>

        {tickets.map((ticket) => (
          <article className="ticket" key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>

            <div className="details">
              <span>Status: {ticket.status}</span>
              <span>Priority: {ticket.priority}</span>
              <span>Category: {ticket.category}</span>
            </div>

            <select
              value={ticket.status}
              onChange={(e) => changeStatus(ticket.id, e.target.value)}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;