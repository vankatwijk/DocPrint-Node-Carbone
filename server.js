if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser'); //package for getting url encodings GET POST request
const app = express()
const carbone = require('carbone')

app.use(express.urlencoded({extended:false})) //tells express we want to get data from form like req.body.email
app.use(methodOverride('_method'))

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
            convertTo : req.body.options //can be docx, txt, ...
        };
        ext = req.body.options
    }

    // Data to inject
    var data = {
        firstname : 'John',
        lastname : 'Doe'
    };

    carbone.render('./node_modules/carbone/examples/simple.odt', data, options, function(err, result){
        if (err) {
          return console.log(err);
        }
        // write the result
        //fs.writeFileSync('result.odt', result);

        res.status(200).json({
            message: 'Success',
            ext,
            body:req.body,
            result: result
        });

      });


})

app.listen(5000)