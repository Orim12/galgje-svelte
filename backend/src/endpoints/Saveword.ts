import payload from 'payload';
import { Endpoint } from 'payload/config';

export const saveWordRouter: Endpoint = {
  path: '/save-word',
  method: 'post',
  handler: async(req, res) => {
    const { word } = req.body;

    if (!word) {
      return res.status(400).json({ message: 'Word is required' });
    }

    try {
      console.log('Received word:', word); // Log de ontvangen waarde

      // Maak een nieuw item aan in de 'words' collectie
      const newWord = await payload.create({
        collection: 'words',
        data: { word },
      });

      console.log('Created new word:', newWord); // Log de gemaakte waarde

      return res.status(200).json({ message: 'Word saved successfully', data: newWord });
    } catch (error) {
      console.error('Error saving word:', error); // Log de fout
      return res.status(500).json({ message: 'Error saving word', error: error.message });
    }
    },
};

export const getWordRouter: Endpoint = {
  path: '/get-word',
  method: 'get',
  handler: async (req, res) => {
    try {
      // Haal het woord op uit de 'words' collectie
      const words = await payload.find({
        collection: 'words',
        limit: 1, // Haal slechts één woord op
      });

      if (words.docs.length === 0) {
        return res.status(404).json({ message: 'No word found' });
      }

      const word = words.docs[0];

      console.log('Retrieved word:', word); // Log het opgehaalde woord

      return res.status(200).json({ message: 'Word retrieved successfully', data: word });
    } catch (error) {
      console.error('Error retrieving word:', error); // Log de fout
      return res.status(500).json({ message: 'Error retrieving word', error: error.message });
    }
  },
};

export const saveScoreRouter: Endpoint = {
  path: '/save-score',
  method: 'post',
  handler: async(req, res) => {
    const { score } = req.body;

    if (!score) {
      return res.status(400).json({ message: 'Score is required' });
    }

    try {
      console.log('Received score:', score); // Log de ontvangen waarde

      // Maak een nieuw item aan in de 'scores' collectie
      const newScore = await payload.create({
        collection: 'scores',
        data: { score },
      });

      console.log('Created new score:', newScore); // Log de gemaakte waarde

      return res.status(200).json({ message: 'Score saved successfully', data: newScore });
    } catch (error) {
      console.error('Error saving score:', error); // Log de fout
      return res.status(500).json({ message: 'Error saving score', error: error.message });
    }
    },
};

export const getScoreRouter: Endpoint = {
  path: '/get-score',
  method: 'get',
  handler: async (req, res) => {
    try {
      // Haal de score op uit de 'scores' collectie
      const scores = await payload.find({
        collection: 'scores',
        limit: 1, // Haal slechts één score op
      });

      if (scores.docs.length === 0) {
        return res.status(404).json({ message: 'No score found' });
      }

      const score = scores.docs[0];

      console.log('Retrieved score:', score); // Log de opgehaalde score

      return res.status(200).json({ message: 'Score retrieved successfully', data: score });
    } catch (error) {
      console.error('Error retrieving score:', error); // Log de fout
      return res.status(500).json({ message: 'Error retrieving score', error: error.message });
    }
  },  
};