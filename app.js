const {express,axios,bodyParser,app,port}=require("./packages/importPackage")
const askAI=require("./api's/chatGPT")



app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const {message}=req.body
  try{
    askAI(message).then((responce)=>{
      if(responce.success!="Error"){
        res.status(200).json({result:responce})
      }
      else{
        res.status(500).json({result:responce})
      }
    })
  }
  catch(err){
    console.error(err)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
