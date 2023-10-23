// Set your OpenAI API key
require("dotenv").config();
const {express,axios,bodyParser,app,port}=require("../packages/importPackage")
const apiKey = process.env.APIKEY;

async function askAI(message){
    
    if (!message) {
        return {success:"Error"}
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
      return {success:chatResponse}
    } catch (error) {
      console.error('Error generating text:', error);
      return {success:"Error"}
    }

}
module.exports=askAI;



  