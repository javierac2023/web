let memoria=[];
let memo_ms=0;

//let textarea = document.getElementById("entradaid");
//textarea.value = ">>";
cant=4;
let tam=30;
ultima_entrada="";
entrada_inicial=""
tarea=document.getElementById("entradaid");
let entrada_0="";
let veces=0; //para presionar enter y operar
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
       // alert('Enter is pressed!');
    	entrada_0=eliminarUltimoSaltoDeLinea_n(document.formulario.entrada.value);
    	//document.formulario.entrada.value=texto;
        operar(1);
    }
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 8) {
       
       let entrada=String(document.formulario.entrada.value);
       n=entrada.length; //ultimo elemento
		
		if (entrada[n-1]==">"&&entrada[n-2]=="\n") {
		  	document.formulario.entrada.value+=">";
		}
    }
});
function rec_foco(){
	tarea.focus();
}
function ponerElCursorAlFinal()
{
    let cursor_focus = document.getElementById("entradaid");
    cursor_focus.selectionStart=cursor_focus.selectionEnd=cursor_focus.value.length;
    cursor_focus.focus();
}
function cifras(){
	cant= document.getElementById("cantidad_cifras2").value;
	let aux="";
	if(ultima_entrada!=""){
			if (Number.isInteger(ultima_entrada)){
				//document.formulario.entrada.value=entrada_inicial+"\n"+">>"+Math.trunc(ultima_entrada);
				aux=limpiar_saltos(entrada_inicial+"\n"+">>"+Math.trunc(ultima_entrada))
				document.formulario.entrada.value=aux;
			}
			else {
				//document.formulario.entrada.value=entrada_inicial+"\n"+">>"+ultima_entrada.toFixed(cant);
				aux=limpiar_saltos(entrada_inicial+"\n"+">>"+ultima_entrada.toFixed(cant))
				document.formulario.entrada.value=aux;
			}
		}
}
function size_font(){
	tam=document.getElementById("tam_fuente").value;
	let textarea = document.getElementById("entradaid");
  	textarea.style.fontSize = String(tam)+"px";
}
function color_font(){
	color=document.getElementById("color_font").value;
	let textarea = document.getElementById("entradaid");
  	textarea.style.color = color;
}
//contar_s_en_s   cuenta cuantas vecs aparese un string dentro de otro string

//ultimo_salto   solo guarda el ultimo salto luego de \n
function eliminarUltimoSaltoDeLinea_n(entrada) {
  let indice = entrada.lastIndexOf("\n");

  if (indice !== -1) {
    let nuevaEntrada = entrada.slice(0, indice) + entrada.slice(indice + 1);
    return nuevaEntrada;
  }

  return entrada;
}
function operar(x) {
	ponerElCursorAlFinal();
	
	let entrada=String(document.formulario.entrada.value);
	//analizamos si se presiono enter y salto la linea del cursor en medio
	//entrada=cursor_en_medio(entrada,x);
	entrada_inicial=entrada;
	//alert("esto se capturo "+entrada)
	if ((entrada=="undefined")||(entrada=="")){
		document.formulario.entrada.value="";
	}
	else{
		
		veces=contar_s_en_s(String(entrada),"\n")-x;
		//alert("veces  con  x : "+veces+" - "+x)
		//alert("esto se analiza :" + entrada)
		entrada=ultimo_salto(entrada,veces);
		entrada=eliminarUltimoSaltoDeLinea_n(entrada); //esta linea se queda con un texto +\n+texto y eliminamos el salto para solo tener una linea final
		//entrada=ultimo_salto(entrada,veces);
		//solo leemos la ultima linea, se ignora las lineas anteriores
		//alert("sale de sinh y entra a cosh  "+entrada)
		//alert("sale de cosh "+entr

		//entrada=filtrar_ast_ant(filtrar_ast_desp(entrada));
	
		entrada=bpi(entrada);
		entrada=bpi2(entrada);
		entrada=be(entrada);
		entrada=bsqrt(entrada);
		entrada=bpot(entrada);
		entrada=bln(entrada);
		entrada=logn(entrada);

		//aqui entrada captura la ultima linea ingresada
		
		
		if (entrada[0]==">"){
			entrada=entrada.slice(2);
			//se borra las dos primeras >> DE LA ULTIMA LINEA
		}
		//aqui entrada captura la ultima linea quitando >> la doble mayor
		if (isNaN(entrada)==false) {
			if (x==1){
				document.formulario.entrada.value=entrada_0+"\n"+">>";
			}
			else{
				document.formulario.entrada.value=entrada_inicial+"\n"+">>";
			}
  			
		}
		else{
					try {
						//alert(entrada)
						entrada=eval(entrada);
						//capturo la evaluacion sin redondeo
						ultima_entrada=entrada;
						entrada=entrada.toFixed(cant)
						//si se presiono enter no debe haber un salto de linea en blanco
						//alert("guardando "+entrada) aqui se guarda el resultado futuro que se va colocar
						if (x==1){
							if (Number.isInteger(parseFloat(entrada))){
									//alert("es entero ")
									document.formulario.entrada.value=entrada_0+"\n"+">>"+Math.trunc(entrada);
								}
								else {
									//alert("no es entero ")
									document.formulario.entrada.value=entrada_0+"\n"+">>"+entrada;
								}	
						}
						else{
							
							if (Number.isInteger(parseFloat(entrada))){				
									document.formulario.entrada.value=entrada_inicial+"\n"+">>"+Math.trunc(entrada);
								}
								else {
									document.formulario.entrada.value=entrada_inicial+"\n"+">>"+entrada;
								}	
						}							
						memoria=entrada;
					}
						catch (err) {
				 				
				 				if (entrada=="li"){
				 						document.formulario.entrada.value="";
				 				}
				 				else{
				 					alert("Expresión incorrecta");
				 							if (x==1){
							 				veces=contar_s_en_s(String(entrada),"\n")-x;
											entrada=ultimo_salto(entrada,veces);
											//entrada=eliminarUltimoSaltoDeLinea_n(entrada);
											//alert(entrada)
											if(entrada[0]!=">"){
												//alert(entrada)
												document.formulario.entrada.value=entrada_inicial+">>";
											}
							 				
				 							}
				 				}
				 				
				 				

							}
			}
		

	}
}

function contar_s_en_s(texto,palabra){
	let contar=0
	n=texto.indexOf(palabra);
	tam=texto.length;
	while (n>=0){
		contar++;
		n=texto.indexOf(palabra,n+1);
	}
	return contar
}
function sin(x) {	  	
	return Math.sin(x);
}

function cos(x) {   	
	return Math.cos(x);
}

function tan(x) {
	return Math.tan(x);
}

function asin(x) {
	return Math.asin(x);
}

function acos(x) {
	return Math.acos(x);
}

function atan(x) {
	return Math.atan(x);
}

function bpi(texto) {
	let veces=parseInt(contar_s_en_s(texto,"π"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){
        	indice=texto.indexOf("π",indice);
            texto=poner_pi(indice,texto);
            indice=indice+6	;
        }       
	}     	
	return texto
}
function poner_pi(indice,texto){
	let x= texto.slice(0,indice)+"Math.PI"+texto.slice(indice+1);
	return x
}
function bpi2(texto) {
	let veces=parseInt(contar_s_en_s(texto,"pi"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){
        	indice=texto.indexOf("pi",indice);
            texto=poner_pi2(indice,texto);
            indice=indice+6;
        }       
	}     	
	return texto
}
function poner_pi2(indice,texto){
	let x= texto.slice(0,indice)+"Math.PI"+texto.slice(indice+2);
	return x
}
function be(texto) {
	let caract = ["v","d","t"];
	let veces=parseInt(contar_s_en_s(texto,"e"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){ 
        	indice=texto.indexOf("e",indice);
        	if (caract.includes(texto[indice-1])==false){
        		texto=poner_e(indice,texto);
            	indice=indice+6	;
        	}  
        	
        }       
	}     	
	return texto
}
function poner_e(indice,texto){
	let x= texto.slice(0,indice)+"Math.E"+texto.slice(indice+1);
	return x
}
function bsqrt(texto) {
	let veces=parseInt(contar_s_en_s(texto,"√"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){
        	indice=texto.indexOf("√",indice);
            texto=poner_sqrt(indice,texto);
            indice=indice+6	;
        }       
	}     	
	return texto
}
function poner_sqrt(indice,texto){
	let x= texto.slice(0,indice)+"Math.sqrt"+texto.slice(indice+1);
	return x
}
function bpot(texto) {
	let veces=parseInt(contar_s_en_s(texto,"^"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){
        	indice=texto.indexOf("^",indice);
            texto=poner_pot(indice,texto);
            indice=indice+2	;
        }       
	}     	
	return texto
}
function poner_pot(indice,texto){
	let x= texto.slice(0,indice)+"**"+texto.slice(indice+1);
	return x
}
function bln(texto) {
	let veces=parseInt(contar_s_en_s(texto,"Ln"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){
        	indice=texto.indexOf("Ln",indice);
            texto=poner_ln(indice,texto);
            indice=indice+7	;
        }       
	}     	
	return texto
}
function poner_ln(indice,texto){
	let x= texto.slice(0,indice)+"Math.log"+texto.slice(indice+2);
	return x
}
function sinh(x) {	
	return Math.sinh(x)
}
function cosh(x) {
	return Math.cosh(x)
}

function tanh(x) {
	return Math.tanh(x)
}
function bmm() {
	texto=String(document.formulario.entrada.value);
	let veces=contar_s_en_s(texto,"\n");
	let queda=ultimo_salto(texto,veces);
	queda=queda.slice(2)
	queda=eval(queda)*(-1)   	
	document.formulario.entrada.value=texto+"\n>>"+String(queda)
}
function borrar(){
	let entrada=String(document.formulario.entrada.value);
	if ((entrada=="undefined")||(entrada=="")){
		document.formulario.entrada.value="";	
	}
	else {
		n=entrada.length; //ultimo elemento
		  if (entrada[n-1]!=">") {
		  	entrada=entrada.slice(0,-1) ;	
			document.formulario.entrada.value=String(entrada);
		  }
		
	}
}

function bans(){
	document.formulario.entrada.value+=memoria;
}


function logn(texto) {
	let veces=parseInt(contar_s_en_s(texto,"Log"))
	if (veces>0){
		let indice=0;
        for (let i=0; i<veces;i++){
        	indice=texto.indexOf("Log",indice);

            valores=poner_logn(indice,texto);
            
            texto=valores[0];
            let n1=valores[1];
            let n3=valores[2];
            //Formula 9+11+(n2-n1-1)+(n3-n2-1)+2
            indice=indice+20+n3-n1;
        }       
	}     	
	return texto
}
function poner_logn(indice,texto){
	let n1=texto.indexOf("g",indice);
	let n2=texto.indexOf("(",indice);
	let n3=texto.indexOf(")",indice);
	let x= texto.slice(0,indice)+"(Math.log("+texto.slice(n2+1,n3)+")/Math.log("+texto.slice(n1+1,n2)+"))"+texto.slice(n3+1);
	return [x,n1,n3]
}

function buscarsalto(texto){
	texto=texto.split("");
	texto=texto.reverse();
	texto=String(texto.join(""));
	if (texto.indexOf("\n",0)) 
		{
			alert("encontre salto");
			alert(texto.slice());
		}
}
function ultimo_salto(texto,veces){
	let indice=0;
	let queda=""
	for (var i = 0; i < veces; i++) {
		indice=texto.indexOf("\n",indice);
		indice=indice+1;
	}
	indice--;
	queda=texto.slice(indice+1)
	return queda;
}

function eliminar_indices_lista(entrada,pos){

	n=entrada.length;
	lista="";
		for (let i=0;i<n;i++){
		    if (pos.indexOf(i)==-1){
		         lista+=String(entrada[i]);
		    }
		}
	return lista;

}
function limpiar_saltos(texto){

		//let y="12\n12\n35\n45\n\n\n66"
		let n=texto.length;

		let lista_De_saltos=[]; //posiciones donde esta \n
		for (let i=0;i<n;i++){
		    if(texto[i]=="\n"){
		        lista_De_saltos.push(parseInt(i))
		    }
		}
		//ya tenemos la lista de la sposicones dond ehay saltos
		m=lista_De_saltos.length;
		eliminar=[]
		for (let i=0;i<m;i++){
		    if(lista_De_saltos[i+1]-lista_De_saltos[i]==1){
		        eliminar.push(i)
		    }
		}
		// eliminar posee la lista de saltos en blanco
		lista_para_eliminar=[];


		for (let i = 0; i<eliminar.length;i++) {
			lista_para_eliminar.push(lista_De_saltos[eliminar[i]])
		}

		let t=eliminar_indices_lista(String(texto),lista_para_eliminar)
		return t
}
function miserie(texto){
	let n=texto.length;
	let x=false;
	for (var i = 0; i < n; i++) {
		let m=texto[i]
		if (Number.isInteger(parseInt(m))==false) {
			if ((m!=".")&&(m!="\n")&&(m!=">")) {
				x=true;
			}
		}
	}
	if (x==true){
		return true // existe una letra u operador
	}
	else{
		return false
	}
}

function abrirVentana() {
  window.open('latex.html', '_blank');
}
function fact(n){
	let lista=[1,1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600,
	 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 
	 121645100408832000, 2432902008176640000, 51090942171709440000];
	return lista[n];
}
function comb(n,k){
	return fact(n)/(fact(k)*fact(n-k))
}
function atan2(x,y){
	return Math.atan2(x, y);
}
function convert(num,n){
	let lista=[]
	if (Number.isInteger(num)==true && Number.isInteger(n)==true){
		if (num>n){
			if (n>1) {
					
					let cociente=num;
		            let convertir=0;
		            while(cociente>=n){
		            	modulo=cociente%n;
		            	lista.push(modulo)
		            	cociente=parseInt(cociente/n);
		            }
		            lista.push(cociente);
		            lista=parseInt(lista.reverse().join(""));
				return lista;	
				}
				
		}
		return "error base menor";			
	}
	else{
		return "valores incorrectos"
	}
}
function calcularDerivada() {
	//no lee **
            let inputExpression = document.getElementById('inputExpression').value;
            const x = math.parse('x');   
            const expression = math.parse(inputExpression);
            const derivative = math.derivative(expression, x);
            let der2=buscarsup(derivative.toString())
            const resultado = Superindices(der2);
            document.getElementById('result').innerHTML = resultado;
}
function Superindices(texto) {
            return texto.replace(/sup\((.*?)\)/g, '<sup>$1</sup>');
        }
function buscarsup(texto){
	let n=texto.length;
	for (let i = 0; i < n; i++) {
	    console.log("encontradox "+ texto[i]);
 		if(texto[i]=="^"){
 		    console.log("encontrado------"+ texto[i]);
 		    
 			if(texto[i+2]=="("){
 				texto=texto.slice(0, i)+"sup"+texto.slice(i+2);
 			}
 			else{
 				texto1=texto.slice(0, i)+"sup(";
 					
 				let j=i+2;
 				while(texto[j]!=" "&& (j<n)){
 					j=j+1;
 				}
 				texto=texto1+texto.slice(i+2,j)+")"+texto.slice(j);
 			}
 		}		
	}
	return texto;
}
