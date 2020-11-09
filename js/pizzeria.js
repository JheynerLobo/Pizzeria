async function leerJSON(url) {

  try {
    let response = await fetch(url);
    let user = await response.json();
    return user;
  } catch(err) {
    
    alert(err);
  }
}

function mostrar(){
var url="https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
var msg="";


leerJSON(url).then(datos=>{

console.log(datos);

var prec=tamanos(datos.pizzas[0].precio); 
msg+=cantidad(prec);

document.getElementById("nombre").innerHTML=leerNombre(datos.nombrePizzeria); 
document.getElementById("ind").innerHTML=msg; 
 

})
}

function mostrarOpciones(){
var url="https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
const parametro= new URLSearchParams(window.location.search);
var encuentre= parametro.get('value');
var msg="";

leerJSON(url).then(datos=>{

document.getElementById("nombre").innerHTML=leerNombre(datos.nombrePizzeria);
 //var p=pizzer(datos.pizzas);
 //var ad=adiciones(datos.adicional);
 msg+=sabores(encuentre, datos);
document.getElementById("opc").innerHTML=msg;
})
}



function pizzer(pizzas) {
let msg="";
for(let i=0;i<pizzas.length;i++)
{
msg+="<option value='"+pizzas[i].sabor+"'name='opciones'>"+pizzas[i].sabor+"</option>";
}
return msg;
}

function leerNombre(datos) {

	let bann="<h1>"+datos+"</h1>";
	return bann;	
}


function crearCanPizzas(precio){
	var cantidad= document.getElementById("entrada").value;
	let n="";
	let carga="";

	if(cantidad>0){
		for (var i = 1; i <= cantidad; i++) {
			n+="<div class='row' id='contenido'><label class='mt-4 mb-3 ml-3 text-dark'>"+
			"Tamano Pizza " +i+":</label>"+
			"<div class='form-row mt-3 mb-3 ml-3'>"+
	   		"<div class='col-auto my-1'>"+
	      	"<label class='mr-sm-2 sr-only text-dark' for='inlineFormCustomSelect'></label>"+
	      	"<select class='custom-select mr-sm-2' id='tama"+i+"' type='select' id='inlineFormCustomSelect'>"
	      	+tamanos(precio)+""+
	     	"</select>"+
	    	"</div></div></div><br>";
		}
		n+="<div id='ole' class='row'>"+
		"<input type='button' class='btn btn-success' onclick='redir("+cantidad+")' value='Cargar Opciones'/>"+
		"</div>";
	}
	else{
	   n+="<div  class='col text-center' id='err'><label class='text-white'>"+
	   "Cantidad de pizzas no validas, por favor ingrese otro numero.</label></div>";
	}	


	carga+="<label class='mt-3 mb-3 ml-3'> Digite cantidad de Pizzas:</label>"+
			"<input readonly='readonly' type='number' value='"+cantidad+"' id='entrada' />"+
			"<input type='button' class='btn btn-success disabled ml-3' onclick='crearCanPizzas()' value='Crear'/>"+
			"<input type='button' class='btn btn-success ml-3' onclick='location.reload()' value='Cargar de nuevo'/>";

	document.getElementById("cargar").innerHTML=carga;
	document.getElementById("pizza").innerHTML=n;	
}

function redir(numero){
	var url='./html/opciones.html?value='+numero+'';
	url+=leer2(numero);
	  location.href=url;
}

function tamanos(precio){
var msg="";
for(var i=0;i<precio.length;i++){
	 msg+="<option value='"+precio[i].tamano+"'>"+precio[i].tamano+"</option>";
}
return msg;
}

function precios(precio){
var msg="";
for(let i=0;i<precio.length;i++){
	 msg+="<option value='"+i+"'>"+precio[i].precio+"</option>";
}
return msg;
}


function cantidad(prec){

	let cant=prec;
	return cant;	

}


function recarga(){

var url="https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
var msg="";

leerJSON(url).then(datos=>{

console.log(datos);
crearCanPizzas(datos.pizzas[0].precio);
})
}




function sabores(cantidad, datos) {
	var id="";
	var s="";
	
	for (var i = 1; i <= cantidad; i++) {

		s+="<div class='row' id='contenido'><label class='mt-4 mb-4 ml-1 text-dark'>"+
	"<div class='row'><div class='col-md-7'>"+
		"<label class='my-1 mr-2' for='inlineFormCustomSelectPref'>Escoja sabores para pizza "+i+" (de escoger uno o dos) </label></div>"+
		"<div class='col-md-2'>"+
		"<form class='form-inline'>	";
		id="select"+i;
		s+="<select class='custom-select mt-3 mb-3 ' id='select"+i+"' onclick='modificarSabor("+id+","+i+","+0+")' type='select' id='inlineFormCustomSelectPref'>";

		s+=pizzer(datos.pizzas)+"</select></form></div>"+
		"<div class='col-md-2 ml-3'>"+
		"<form class='form-inline'>";
		id="select2"+i;
		s+="<select class='custom-select mt-3 mb-3 'id='select2"+i+"' type='select' id='inlineFormCustomSelectPref'onclick='modificarSabor("+id+","+i+","+1+")'>"+
		"<option value='ninguno'>Ninguno</option>";
		s+=pizzer(datos.pizzas)+"</select></form></div></div>";

        
		s+="<div class='row'><div class='col-md-7'><div class='row ml-2' value='habilitado' id='actSabor"+i+"'>"+
			"<label class='my-1 mr-2'>Ingredientes adicionales (Pizza Napolitana)</label></div>"+
			"<div>"+adiciones(datos.adicional,i,0,'habilitado')+"</div>";			
		s+="<div class='row ml-2' value='deshabilitado' id='actuaSabor"+i+"'>"+
			"<label class=' mr-2'>Ingredientes adicionales (Escogió ninguno)</label></div><div id='deshabilitar"+i+"'>"+adiciones(datos.adicional,i,1,'deshabilitado')+
		"</div></div><div class='col-md-5'><img id='img"+i+0+"' class='ml-2' src='http://madarme.co/persistencia/pizza/napolitana.jpg' height='140px' width='140px'>"+
        "<img id='img"+i+1+"' class='ml-4 ' src='' height='140px' width='140px'></div></div></div><br>";
	}
			
		s+="<div class='row'>"+
		"<div class='col-md-6'></div>"+
		"<div class='col-md-6 text-left'>"+
		"<input type='button' class='btn btn-success' onclick='redirFactura("+cantidad+")' value='Calcular Factura'/>"+
		"</div></div>";
return s;
}
function factura(){
var url="https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
const parametro= new URLSearchParams(window.location.search);
var encuentre= parametro.get('value');
var msg="";

leerJSON(url).then(datos=>{
leerUrlFactura(datos);
document.getElementById("nombre").innerHTML=leerNombre(datos.nombrePizzeria);
 
})
}

function redirFactura(numero){
	var url='./factura.html?value='+numero+'&'+seleccionSabores(numero);
	  location.href=url;
}

function adiciones(adicional,f,pos,m)
{

var adicion="<div class='row'>";
for(let i=0;i<adicional.length;i++){
 if(m=='habilitado'){
 	adicion+="<div class='col-auto ml-3'><input class='form-check-input' id='input"+f+pos+i+"' name='input' type='checkbox' value='"+adicional[i].nombre_ingrediente+"'>";
  	}
 if(m=='deshabilitado'){
 	adicion+="<div class='col-auto ml-3'><input class='form-check-input' id='input"+f+pos+i+"' name='input' type='checkbox' value='"+adicional[i].nombre_ingrediente+"' disabled>";
    }
adicion+="<label>"+adicional[i].nombre_ingrediente+"</label></div>";  
}
adicion+="</div>";
return adicion;
}
/*
function seleccionSabores(numero) {
  var pizza=new Array(numero);  
  var tamano=leerTmUrl(numero);

for (var i =0; i<numero; i++) {
var sabores=new Array(2);
var adic=new Array(2);
var adici=new Array(2);
var a=new Array(2);

var l = document.getElementById('select'+(i+1));
var index =l.selectedIndex;
var oS = l.options[index];
var valor = oS.value;
adic[0]=valor;
adic[1]=leerCheckbox(i+1,0);
sabores[0]=adic;


var ll = document.getElementById('select2'+(i+1));
var index =ll.selectedIndex;
var oS2 = ll.options[index];
var valor2 = oS2.value;
adici[0]=valor2;
adici[1]=leerCheckbox(i+1,1);
sabores[1]=adici;
a[0]=sabores;
a[1]=tamano[i];
pizza[i]=a;
}

console.log(pizza);
return pizza;
}*/

function seleccionSabores(numero) {
  var pizza="";  
 
  var tamano=leerTmUrl(numero);

for (var i =0; i<numero; i++) {
var sabores="";
var adic="";
var adici="";


var l = document.getElementById('select'+(i+1));
var index =l.selectedIndex;
var oS = l.options[index];
var valor = oS.value;
adic="&Sabor"+(i+1)+0+"="+valor+"&";
adic+="adicio"+(i+1)+0+"="+leerCheckbox(i+1,0)+"&";
sabores=adic;


var ll = document.getElementById('select2'+(i+1));
var index =ll.selectedIndex;
var oS2 = ll.options[index];
var valor2 = oS2.value;
adici="Sabor"+(i+1)+1+"="+valor2+"&";
adici+="adicio"+(i+1)+1+"="+leerCheckbox(i+1,0)+"&";
sabores+=adici;
sabores+="tam"+(i+1)+"="+tamano[i];
pizza+=sabores;
}

return pizza;
}

function leerUrlFactura(datos){
const urlParams = new URLSearchParams(window.location.search);
  var value=urlParams.get('value');
var tabla="";
var valor=0;
var factura=0;
 tabla+="<table border='1'>"+
        "<tr>"+
        "<th> Descripción </th>"+
        "<th> Valor </th>"+
        "</tr>";
      for(var i=1;i<=value;i++){
       var tam=urlParams.get('tam'+i);
       var sab1=urlParams.get('Sabor'+i+0);
       var sab2=urlParams.get('Sabor'+i+1);
       
       if(sab2=='ninguno'){
       	tabla+="\n<tr>"+
       	"\n<td>Pizza "+tam+" "+sab1+"</td>";
       	valor=valorMasAlto(tam,datos.pizzas,sab1,sab2);
       	factura+=valor;
      tabla+="\n<td>"+"$"+valor+"</td>"+
       "</tr>";
       var ma=obtenerAdicionales(urlParams.get('adicio'+i+0));
       for(var j=0;j<ma.length;j++){
       	if(ma[j]=='true'){tabla+="\n<tr>"+
       	"\n<td>Adicional-"+sab1+"-"+datos.adicional[j].nombre_ingrediente+"</td>";
       valor=datos.adicional[j].valor;
       factura+=valor;
       	tabla+="\n<td>"+"$"+valor+"</td>"+
      "</tr>";
   }
}
}
       
       else{
       	tabla+="\n<tr>"+
       	"\n<td>Pizza "+tam+" Mitad "+sab1+" y Mitad "+sab2+"</td>";
         valor=valorMasAlto(tam,datos.pizzas,sab1,sab2);
         factura+=valor;
       	tabla+="\n<td>"+"$"+valor+"</td></tr>";
       	var ma=obtenerAdicionales(urlParams.get('adicio'+i+0));
       for(var j=0;j<ma.length;j++){
       	if(ma[j]=='true'){tabla+="\n<tr>"+
       	"\n<td>Adicional-"+sab1+"-"+datos.adicional[j].nombre_ingrediente+"</td>";
         valor+=datos.adicional[j].valor;
         factura+=valor;
       	tabla+="\n<td>"+"$"+valor+"</td>";
       tabla+="</tr>";
       }
       }
   
       var ma=obtenerAdicionales(urlParams.get('adicio'+i+1));
       for(var j=0;j<ma.length;j++){
       	if(ma[j]=='true'){tabla+="\n<tr>"+
       	"\n<td>Adicional-"+sab2+"-"+datos.adicional[j].nombre_ingrediente+"</td>";
       valor=datos.adicional[j].valor;
       factura+=valor;
       	tabla+="\n<td>"+"$"+valor+"</td>";
       tabla+="</tr>";
}
}
}
}
        tabla+="\n<tr>"+
       	"\n<td>Total:</td>";
       	tabla+="\n<td>"+"$"+factura+"</td>";
       tabla+="</tr>";
     tabla+="</table>";
 obtenerAdicionales(urlParams.get('adicio10'));
document.getElementById("opc").innerHTML=tabla;
}


function valorMasAlto(tam,pizzas,sab1,sab2){
var valor1=0;
var valor2=0;
for(var i=0;i<pizzas.length;i++){
	if(pizzas[i].sabor==sab1){
		for(var m=0;m<pizzas[i].precio.length;m++){
           if(pizzas[i].precio[m].tamano==tam){
           
           	valor1=pizzas[i].precio[m].precio;
           	
           }
		}
	}
		if(pizzas[i].sabor==sab2){
		for(var j=0;j<pizzas[i].precio.length;j++){
           if(pizzas[i].precio[j].tamano==tam){
           	valor2=pizzas[i].precio[j].precio;
           	
	}
}
}
}
//console.log(valor1);
//console.log(valor2);
if(valor1>valor2){
	return valor1;
}
else{return valor2;}
}

function obtenerAdicionales(adicionales){
var extras=adicionales.split(',');
return extras;

}

function leerTmUrl(numero){
  const urlParams = new URLSearchParams(window.location.search);
  var tamanios=new Array(numero);
  for (var i = 0; i <= numero; i++) {
    tamanios[i]=urlParams.get('tama'+(i+1));
  } 
return tamanios;
}

function leer2(numero){
  var msg="";
  for(var i=1;i<=numero;i++){
    var l=document.getElementById('tama'+i);
    var iS =l.selectedIndex;
    var oS = l.options[iS];
    var vS = oS.value;
    msg+='&tama'+i+'='+vS;
  }
return msg;
}


function leerCheckbox(numero,s) {
var ad=new Array(4);
var desh=[false,false,false,false];
if(s==1){
	if(document.getElementById('actuaSabor'+numero).value=='deshabilitado'){
		return desh;
	}
}
for (var i = 0; i < ad.length; i++) {
var dh = document.getElementById('input'+numero+s+i);
  //var el = inputs[i];
  if (dh.type =='checkbox') {  
  	ad[i]=dh.checked;}
}
	return ad;
}

function modificarSabor(id,pizza,pos){
var msg="";
var c=id;
var index =c.selectedIndex;
var oSe=c.options[index];
var valor=oSe.value;

if(pos=='0'){
	msg+="<label class='row-md.12'> Ingredientes adicionales (Pizza "+valor+")</label>";
	document.getElementById("actSabor"+pizza).innerHTML=msg;
	imagen(valor,pizza,pos);
}
if(pos=='1'){
	if(valor=='ninguno'){		
	msg+="<label class='row-md.12'> Ingredientes adicionales (Escogió ninguno)</label>";
	deshabilitarAd("actuaSabor"+pizza, pizza, pos,'deshabilitado');
	imagen(valor,pizza,pos);
	}
	else{
	msg+="<label class='row-md.12'> Ingredientes adicionales (Pizza "+valor+")</label>";
	deshabilitarAd("actSabor" +pizza, pizza, pos,'habilitado');
	imagen(valor,pizza,pos);
	}
	document.getElementById("actuaSabor"+pizza).innerHTML=msg;
}
}

function imagen(sabor,pizza,pos){
   var url="https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
  var msg="";
leerJSON(url).then(datos=>{
 	if(sabor!='ninguno'){
 	for(var i=0;i<datos.pizzas.length;i++){
 		if(sabor==datos.pizzas[i].sabor){
 			document.getElementById("img"+pizza+pos).src=datos.pizzas[i].url_Imagen;
 		}
 	}
}
else{
	document.getElementById("img"+pizza+pos).src="";
}
})

}

function deshabilitarAd(id,pizza,pos,j){
 var url="https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";

var msg="";
leerJSON(url).then(datos=>{
	msg=adiciones(datos.adicional,pizza,pos,j);
    document.getElementById("deshabilitar"+pizza).innerHTML=msg;
    document.getElementById("deshabilitar"+pizza).value=j;     
})
}


