# DocPrint-Node-Carbone
node server using carbone takes a json string containing a data json and a tamplate in the formate base64 and merges them together using carbone.The output is a base64 string of the merged document.

#instalation
```bash
# run the app using node
npm install
```

#running the code
```bash
# run the app using node
npm run devStart
```


# example input
```
{
    "options":{
        "convertTo": "pdf"
    },
    "data":{
        "firstname1":"tom",
        "lastname1":"smith"
    },
    "template":"base64 string"
}
```

# example output
```
{
    "message": "Success",
    "options": {
        "convertTo": "pdf"
    },
    "result": "base64 string"
}
```


## Built With
* [nodejs](https://nodejs.org/en/) - JS runtime
* [carbone](https://github.com/Ideolys/carbone) - node report generator
