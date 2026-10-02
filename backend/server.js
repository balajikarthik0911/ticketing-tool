const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tickets = [];
let nextId = 1;

const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];
const VALID_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED"];
const VALID_CATEGORIES = ["TECHNICAL", "BILLING", "ACCOUNT", "GENERAL"];

// Validate ticket data
function validateTicket(data) {
  const { title, description, priority, status, category } = data;

  if (!title || !description || !priority || !status || !category) {
    return "All fields are required";
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    return "Priority must be LOW, MEDIUM, or HIGH";
  }

  if (!VALID_STATUSES.includes(status)) {
    return "Status must be OPEN, IN_PROGRESS, or RESOLVED";
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return "Category must be TECHNICAL, BILLING, ACCOUNT, or GENERAL";
  }

  return null;
}

// POST /api/tickets
// Create a new ticket
app.post("/api/tickets", (req, res) => {
  const error = validateTicket(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  const ticket = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    category: req.body.category
  };

  tickets.push(ticket);

  res.status(201).json({
    success: true,
    message: "Ticket created successfully",
    ticket
  });
});

// GET /api/tickets
// Get all tickets
app.get("/api/tickets", (req, res) => {
  res.status(200).json({
    success: true,
    count: tickets.length,
    tickets
  });
});

// GET /api/tickets/:id
// Get a single ticket
app.get("/api/tickets/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found"
    });
  }

  res.status(200).json({
    success: true,
    ticket
  });
});

// PUT /api/tickets/:id
// Update a ticket
app.put("/api/tickets/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found"
    });
  }

  const error = validateTicket(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error
    });
  }

  tickets[ticketIndex] = {
    id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    category: req.body.category
  };

  res.status(200).json({
    success: true,
    message: "Ticket updated successfully",
    ticket: tickets[ticketIndex]
  });
});

// DELETE /api/tickets/:id
// Delete a ticket
app.delete("/api/tickets/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found"
    });
  }

  tickets.splice(ticketIndex, 1);

  res.status(204).send();
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});