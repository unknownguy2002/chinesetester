const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch')
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public'), {extensions:['html']}));

app.get('/api/pinyin', async function(req, res){
    if(!req.query.word){
        res.sendStatus(400)
    }else{
        console.log("Pinyin req for: "+req.query.word)
        let result = await fetch(`https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=${encodeURI(req.query.word)}&format=json`);
        console.log(`https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=${encodeURI(req.query.word)}&format=json`)
        if(!result.ok){
            res.sendStatus(400);
        }else{
            res.send(await result.json());
        }

    }
})

server.listen(port, ()=>{
    console.log("Listening on port "+port);
});