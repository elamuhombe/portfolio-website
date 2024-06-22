//src/Server.ts
// Import the 'express' framework and types for Request and Response objects
import express, { Request, Response } from "express";

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Create an instance of the express application
const app = express();

// Define the port number from environment variable PORT or default to 5200
const port = process.env.PORT || 5200;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
