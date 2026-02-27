const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let conversationHistory = {};

app.post("/chat", (req, res) => {
  const { message, user } = req.body;

  if (!conversationHistory[user]) {
    conversationHistory[user] = [];
  }

  conversationHistory[user].push({ role: "user", text: message });

  const lower = message.toLowerCase();
  let reply = "";

  // Greeting
  if (lower.includes("hello") || lower.includes("hi")) {
    reply = "Hello! How can I assist you today?";
  }

  // Goodbye
  else if (lower.includes("bye")) {
    reply = "Goodbye! Have a great day!";
  }

  // Azure Info
  else if (lower.includes("what is azure")) {
    reply = "Azure is Microsoft's cloud computing platform used for hosting apps, AI services, databases, and virtual machines.";
  }

  else if (lower.includes("what services does azure provide")) {
    reply = "Azure provides services like Virtual Machines, App Services, Azure AI, Databases, Storage, Networking, and DevOps tools.";
  }

  // Chatbot Info
  else if (lower.includes("who are you")) {
    reply = "I am an intelligent chatbot deployed on Microsoft Azure.";
  }

  else if (lower.includes("what can you do")) {
    reply = "I can answer basic questions, demonstrate intent recognition, and simulate knowledge-based responses.";
  }

  // Cloud Concepts
  else if (lower.includes("what is cloud computing")) {
    reply = "Cloud computing is the delivery of computing services over the internet, including storage, processing power, and networking.";
  }

  else if (lower.includes("what is devops")) {
    reply = "DevOps is a practice that combines development and operations to enable continuous integration and continuous deployment.";
  }

  else if (lower.includes("what is ci cd")) {
    reply = "CI/CD stands for Continuous Integration and Continuous Deployment, which automates building, testing, and deploying applications.";
  }

  // University-style Q&A
  else if (lower.includes("what is artificial intelligence")) {
    reply = "Artificial Intelligence is the simulation of human intelligence by machines, enabling systems to learn and make decisions.";
  }

  else if (lower.includes("what is machine learning")) {
    reply = "Machine Learning is a subset of AI that allows systems to learn from data and improve without explicit programming.";
  }

  else {
    reply = "I'm not sure about that yet, but I can be expanded with more knowledge!";
  }

  conversationHistory[user].push({ role: "bot", text: reply });

  res.json({
    reply: reply,
    history: conversationHistory[user]
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
