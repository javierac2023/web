let matriz;
let size;
function crearTabla() {
    const sizeInput = document.getElementById('size');
    size = parseInt(sizeInput.value);

    if (isNaN(size) || size < 2 || size > 10) {
        alert('Por favor, ingrese un valor válido para "n" entre 2 y 10.');
        return;
    }

    const tablaContainer = document.getElementById('tabla-container');
    tablaContainer.innerHTML = ''; // Limpiar cualquier tabla anterior
    const tabla = document.createElement('table');

	

    for (let i = 0; i < size; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const celda = document.createElement('td');
            celda.className = 'class_celda';
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'casilla';
            celda.appendChild(input);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tablaContainer.appendChild(tabla);
 	//creamos el tamaño de la matriz
    matriz = new Array(size);
    for (let i = 0; i < size; i++) {
        matriz[i] = new Array(size);
    }
    //parentesis
    var myDiv = document.getElementById("parents1");
    myDiv.style.display = "block"; 
    var myDiv = document.getElementById("parents2");
    myDiv.style.display = "block"; 

    const parentesSpan1 =  document.getElementById("parents1");;
    parentesSpan1.style.fontSize = (size * 30) + 'px';
    const parentesSpan2 =  document.getElementById("parents2");;
    parentesSpan2.style.fontSize = (size * 30) + 'px';
}

function obtenerValores() {
    const tabla = document.getElementsByTagName('table')[0];
    const filas = tabla.getElementsByTagName('tr');
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        for (let j = 0; j < celdas.length; j++) {
            const input = celdas[j].querySelector('input');
            //console.log(`Valor en la celda ${i},${j}: ${input.value}`);
            matriz[i][j]=parseFloat(input.value);
        }
    }

    return matriz;
}
function mostrar_m(matrix){
	//muestra la matrix una vez calculada en js, le da formato par imprimir
	//obtenerValores();
	let str="";
	 for (let i = 0; i < size; i++) {
	 str=str+"[";
			 for (let j = 0; j < size; j++) {
			 	if(j<size-1){
			 		str=str+String(matrix[i][j])+" , ";
				}
			 	else{
			 		str=str+String(matrix[i][j]);
			 	}
			 }
	 	str=str+"]";
	 		if(i<size-1){
	 		str=str+"\n";
	 }
	}
	 //str=str+" ] ]";
	 return str;
}
function Determinante(){
	m=obtenerValores();
	let det=determinante_m(m);
	let textareaElement=document.querySelector('.salida_m');
	textareaElement.value+="\n"+"Determinante de :\n"+mostrar_m(m)+"\n = "+det;

}
function determinante_m(matrix){
	let n=matrix.length;
	let det=0;
	for (var k = 0; k< n; k++) {
		if(n==1){
			det=matrix[0][0]
		}
		else if (n==2){
		    det=matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0];
		}
		else {
			valor=((-1)**(k))*(matrix[0][k])*determinante_m(reducida_m(matrix,0,k));
         	det=det+valor;
		}
	}
	return det;
}
function reducida_m(matrix,p,q){
	let n=matrix.length;
	new_matrix = new Array(n-1);
    for (let i = 0; i < (n-1); i++) {
        new_matrix[i] = new Array(n-1);
    }
    new_matrix=matrix.slice(0,p).concat(matrix.slice(p+1,n))
    for (let i = 0; i < (n-1); i++) {
    let part=new_matrix[i].slice(0,q).concat(new_matrix[i].slice(q+1,n))
       new_matrix[i]=part;
    }
	return new_matrix;

}
function transpuesta(matrix){
	n=matrix.length;

	new_matriz = new Array(n);
    for (let i = 0; i < n; i++) {
        new_matriz[i] = new Array(n);
    }

	for (let i = 0; i < n; i++) {
			 for (let j = 0; j < n; j++) {
			 	new_matriz[i][j]=matrix[j][i];
			 }
	}
	return new_matriz;
}
function adjunta(matrix){
	let det=determinante_m(matrix);
	n=matrix.length;
	new_matriz = new Array(n);
    for (let i = 0; i < n; i++) {
        new_matriz[i] = new Array(n);
    }
	for (let i = 0; i < n; i++) {
				 for (let j = 0; j < n; j++) {
				 	new_matriz[i][j]=((((-1)**(i+j))*determinante_m(reducida_m(matrix,i,j)))/det).toFixed(4);
				 }
		}
	return new_matriz;
}
function Inversa(){
	let m=obtenerValores();
	let matriz=transpuesta(adjunta(m));
	let det=determinante_m(m);
	let textareaElement=document.querySelector('.salida_m');
	textareaElement.value+="\n"+"Inversa de :\n"+mostrar_m(m)+"\n="+mostrar_m(matriz) + "\n";

}
function producto_m(m1,m2){
	let n=m1.length;
	let suma=0;
	new_matriz = new Array(n);
    for (let i = 0; i < n; i++) {
        new_matriz[i] = new Array(n);
    }

	 for (let i = 0; i < n; i++) {
	 	 for (let j = 0; j < n; j++) {
	 	 	suma=0;
	 	 	 for (let k = 0; k < n; k++) {
				suma=suma+m1[i][k]*m2[k][j]
	 	 	 }
	 	 	 new_matriz[i][j]=suma;
	 	 	}}
	 return new_matriz;
}
function Potencia(){
	let pot = parseInt(document.querySelector('.potencia_m').value);
	if (isNaN(pot) || pot < 1 || pot > 10) {
        alert('Por favor, ingrese un valor válido para "pot" entre 2 y 10.');
    }
    else{
	    let m=obtenerValores();
		let n=m.length;
		let lista_pot = new Array(1);
		lista_pot[0]=m;
		let textareaElement=document.querySelector('.salida_m');
		if(pot==1){
			textareaElement.value+= "\n"+"Potencia "+pot+"=\n"+mostrar_m(m);
		}
		else if(pot==2){
			lista_pot[1]=producto_m(m,m);
			textareaElement.value+= "\n"+"Potencia "+pot+"=\n"+mostrar_m(lista_pot[1]);
		}
		else{
			lista_pot[1]=producto_m(m,m);
				for (var i = 2 ; i< pot; i++) {
				lista_pot[i]=producto_m(lista_pot[1],lista_pot[i-1])
		 		}
		 	textareaElement.value+= "\n"+"Potencia "+pot+"=\n"+mostrar_m(lista_pot[pot-1]);
			}

		
    }

	
}
function Limpiar_m(){
	let textareaElement=document.querySelector('.salida_m');
	textareaElement.value= "";

}
function GaussJordan(){
	let textareaElement=document.querySelector('.salida_m');
	let matrix=obtenerValores();
	
	//
	let n=matrix.length;
	let fila_saltar;
	for (let col = 0; col < (n-1); col++) {
		//no nulo
		if(matrix[col][col]==0){
			fila=cambiar_fila(matrix,col,n)
			//alert("cambio fila " +col+"por la fila "+fila);
			if(fila==0){
				fila_saltar=0;
				continue;
			}
			matrix=cambiar_fila2(matrix,col,fila)
		}
		let aumentar;
		if (fila_saltar==0){
			aumentar=1;
		}
		else{
			aumentar=0;
		}
		columna=col;
		for (let i = columna+1; i < n; i++) {
		//col,col no nulo

		let factor=matrix[i][columna]/matrix[columna][columna];
		let princ=matrix[i][columna];

			for (let j = columna; j < n; j++) {
				
				//alert(matrix[i][j]+" - "+matrix[i-1][j]+"*"+princ+"/"+matrix[col][col]);

			 	matrix[i][j]=matrix[i][j]-matrix[columna][j]*factor;
			 }
		
			 
		}
		fila_saltar=1;
	}
	
	textareaElement.value+="\n"+"MATRIX TRIANG :\n"+mostrar_m(matrix);
}
function cambiar_fila(matriz,fila,n){
	let cambiar=0;
	for (let i = fila+1; i < n; i++) {

		//alert("fila analizando" +i)
		if(matriz[i][fila]!=0){
			cambiar=i;
			break;
		}
		
	}
	return cambiar;
}
function cambiar_fila2(matriz,fila1,fila2){
    let aux=matriz[fila2];
    matriz[fila2]= matriz[fila1];
    matriz[fila1]= aux;

    return matriz;
}