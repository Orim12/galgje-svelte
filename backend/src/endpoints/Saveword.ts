import express from 'express';
import payload from 'payload';

export const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: 'lol',
    express: app,
  });

  // Define custom routes
  app.post('/api/save-word', async (req, res) => {
    try {
      const { word } = req.body;  // Get the word from the request body

      if (!word) {
        return res.status(400).json({ message: 'Woord is vereist' });
      }

      // Logic to save the word
      // This can be in a database or another storage mechanism

      // Example: save in an in-memory object (use a real database in production)
      globalThis.savedWord = word;

      res.status(200).json({ message: 'Woord opgeslagen', word });
    } catch (error) {
      res.status(500).json({ message: 'Fout bij het opslaan van het woord', error: error.message });
    }
  });

  app.get('/api/get-word', (req, res) => {
    try {
      // Get the saved word
      const word = globalThis.savedWord || 'Geen woord opgeslagen';

      res.status(200).json({ word });
    } catch (error) {
      res.status(500).json({ message: 'Fout bij het ophalen van het woord', error: error.message });
    }
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Call the start function to initialize the server
start();