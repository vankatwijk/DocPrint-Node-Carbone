if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser'); //package for getting url encodings GET POST request
const app = express()
const carbone = require('carbone')
const fs = require('fs');
const uuid = require('uuid');

app.use(express.urlencoded({extended:false})) //tells express we want to get data from form like req.body.email
app.use(methodOverride('_method'))
app.use(bodyParser.json());


//testing endpoint
app.get('/', async (req, res) =>{

    res.status(200).json({
        message: 'Success'
    });

})


app.get('/generate', async (req, res) =>{
    var options = {};
    var ext = 'odt'
    console.log(req.body)
    if(req.body.options){
        options = {
            convertTo : req.body.options.convertTo //can be docx, txt, ...
        };
        ext = req.body.options.convertTo
    }

    // Data to inject
    var data = req.body.data
    var template = req.body.template
    var templatename = uuid.v4()+'-result.odt'
    fs.writeFileSync('temp/'+templatename, template, {encoding: 'base64'});

    carbone.render('temp/'+templatename, data, options, function(err, result){
        if (err) {
            res.status(400).json({
                message: 'failed',
                error:err
            });
            return console.log(err);
        }
        // write the result
        //fs.writeFileSync('result.odt', result);
        fs.unlinkSync('temp/'+templatename)

        res.status(200).json({
            message: 'Success',
            options,
            result: result.toString('base64') //.toString('utf-8')
        });

      });


})

app.listen(5000)