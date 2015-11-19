var dirHtml ='../../../public/frontend/html';
var jadeFile=[
{jade:'ticket',opciones:{titulo:"Ticket"}},
{jade:'home',opciones:{titulo:"Ticket"}}
];


var jade = require('jade');
var fs = require('fs');
console.log("Directorio destino",dirHtml);
jadeFile.forEach(function(filejade,array){
  fs.mkdir(dirHtml, function(){
    fs.writeFile(dirHtml+'/'+filejade.jade+'.html',jade.renderFile(filejade.jade+'.jade',filejade.opciones), 'utf8',function(){
      console.log(filejade.jade+".jade","->",filejade.jade+".html")
    });
  });
})
