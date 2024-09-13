import payload from 'payload';
import { Endpoint } from 'payload/config';
//! words
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
//! scores
export const saveScoreRouter: Endpoint = {
  path: '/save-score',
  method: 'post',
  handler: async (req, res) => {
    const { score, plrname } = req.body;

    if (!score || !plrname) {
      return res.status(400).json({ message: 'Score and name are required' });
    }

    try {
      console.log('Received score:', score, 'and name:', plrname); // Log de ontvangen waarden

      // Controleer of er al een record bestaat met dezelfde naam
      const existingRecord = await payload.find({
        collection: 'scores',
        where: {
          plrname: {
            equals: plrname,
          },
        },
      });

      let responseMessage;
      let responseData;

      if (existingRecord.docs.length > 0) {
        const existingScore = existingRecord.docs[0].score;

        if (score <= existingScore) {
          console.log('New score is lower or equal to existing score. No update performed.');
          return res.status(200).json({ message: 'New score is lower or equal to existing score. No update performed.', data: existingRecord.docs[0] });
        }

        // Update de score van het bestaande record
        const updatedRecord = await payload.update({
          collection: 'scores',
          id: existingRecord.docs[0].id,
          data: { score },
        });

        console.log('Updated score:', updatedRecord); // Log de bijgewerkte waarde
        responseMessage = 'Score updated successfully';
        responseData = updatedRecord;
      } else {
        // Maak een nieuw item aan in de 'scores' collectie
        const newScore = await payload.create({
          collection: 'scores',
          data: { score, plrname },
        });

        console.log('Created new score:', newScore); // Log de gemaakte waarde
        responseMessage = 'Score and name saved successfully';
        responseData = newScore;
      }

      return res.status(200).json({ message: responseMessage, data: responseData });
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
      // Haal alle scores op uit de 'scores' collectie
      const scores = await payload.find({
        collection: 'scores',
      });

      if (scores.docs.length === 0) {
        return res.status(404).json({ message: 'No scores found' });
      }

      console.log('Retrieved scores:', scores.docs); // Log de opgehaalde scores

      return res.status(200).json({ message: 'Scores retrieved successfully', data: scores.docs });
    } catch (error) {
      console.error('Error retrieving scores:', error); // Log de fout
      return res.status(500).json({ message: 'Error retrieving scores', error: error.message });
    }
  },
};