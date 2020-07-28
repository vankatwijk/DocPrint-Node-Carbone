if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const methodOverride = require('method-override')
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

    carbone.render('./node_modules/carbone/examples/simple.odt', data, function(err, result){
        if (err) {
          return console.log(err);
        }
        // write the result
        //fs.writeFileSync('result.odt', result);

        res.status(200).json({
            message: 'Success',
            pdfbinary: result
        });

      });


})

app.listen(5000)