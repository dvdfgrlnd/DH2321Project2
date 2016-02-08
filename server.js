var express=require('express');
var app=express();
app.use(express.static('public')).listen(1337);

var fs=require('fs');
fs.readFile('public/data/merge.json', 'utf8', function(err, text){
    var data=JSON.parse(text);
    var countries=[];
    Object.keys(data).forEach((c)=>{
        var recreated={};
        data[c].forEach((i, d)=>{
            recreated[data[c][d].answer]={};
            Object.keys(data[c][d]).forEach((p)=>{
                if(p!='answer'){
                    recreated[data[c][d].answer][p]=data[c][d][p];
                }
            });
        });
        countries.push({name:c, values: recreated});
    });
    fs.writeFile('public/data/dataThree.json', JSON.stringify(countries), 'utf8');
});