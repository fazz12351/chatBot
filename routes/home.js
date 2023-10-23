const {express,axios,bodyParser,app,port}=require("./packages/importPackage")

app.post('/chat', async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: message,
          max_tokens: 150, // You can adjust this value
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const chatResponse = response.data.choices[0].text;
      res.json({ response: chatResponse });
      console.log(chatResponse)
    } catch (error) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });
  