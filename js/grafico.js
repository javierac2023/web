

//let llamado_grafico; // esta funcion sirve par llamar a la funcion grafico a pesar de esatr dentro de la funcion "carga inicial"
let colorPicker="";
let color_graf="red";
let grosor=2;
let vecesx=0;
let graficoGenerado=false;
let estilo_linea="circle"
let canvas = document.getElementById('grafico');
let ctx = canvas.getContext('2d');
//let chart;
let tam_marcador=4;
let selectElement1 = document.getElementById("marcador_linea");
let selectElement2 = document.getElementById("grosor_linea");
let selectElement3 = document.getElementById("tam_marcador");

let horizontalScrollbar = document.getElementById("h_Scrollbar");
horizontalScrollbar.type = "range";
horizontalScrollbar.min = "50";
horizontalScrollbar.max = "100";
horizontalScrollbar.value = "75";
//container = document.getElementById('canvas-container');
//container.appendChild(horizontalScrollbar);  no es necesario


let botonGrafica = document.getElementById('graficax');
botonGrafica.addEventListener('click', llamado_grafico);
let botonOcultar = document.getElementById('ocultarx');
botonOcultar.addEventListener('click', destruir);


horizontalScrollbar.addEventListener("input", function() {
   let container = document.getElementById('canvas_container');
   let screenWidth = window.innerWidth;
   let ancho = this.value;
   valor=screenWidth*ancho/100-70;
   //alert("ancho "+valor)
   container.style.width=valor+'px';

   llamado_grafico();
 
 });

  colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", function() {
  color_graf = this.value;
  // Destruir el gráfico anterior si existe
  llamado_grafico();

  });

function llamado_grafico(){


      graficoGenerado = true;
      colorPicker.style.display = "block";  // el color picker siempre aparece junto al grafico

      //horizontalScrollbar.style.visibility = "visible";
      horizontalScrollbar.style.display = "block";
      selectElement1.style.display = "block";
      selectElement2.style.display = "block";
      selectElement3.style.display = "block";
      let divx = document.getElementById('canvas_container');
      divx.style.display = 'block';
      let div2= document.getElementById('scrolls');
      div2.style.display = 'block';
    if (vecesx==1) 
      {
        chart.destroy(); }
        
    let xmin=parseFloat(document.getElementById("xmin").value);
    let xmax=parseFloat(document.getElementById("xmax").value);
    let deltai=parseFloat(document.getElementById("delta").value);
    if (deltai<=0 || isNaN(deltai) ) {
      deltai=0.1;
    }
    if (isNaN(xmin)) { xmin=-2}
    if (isNaN(xmax)) { xmax=2}
      //let entrada=("tan(x)*e+cos(x)-√(2)");
      let entrada=document.getElementById("funcion_entrada").value;

      
      let e_inicial=entrada;
      entrada=filtrar_ast_ant(filtrar_ast_desp(entrada));
      
      entrada=bpi(entrada);
      entrada=bpi2(entrada);
      entrada=be(entrada);
      entrada=bsqrt(entrada);
      entrada=bpot(entrada);
      entrada=bln(entrada);
      entrada=logn(entrada);
      //alert(entrada)
      const puntosX = [];
      for (let x = xmin; x <= xmax+deltai; x += deltai) {
        puntosX.push(x);
      }
      
      const puntosY = puntosX.map(x => eval(entrada));
      //canvas = document.getElementById('grafico');
      //ctx = canvas.getContext('2d');
      
      chart = new Chart(  ctx, {
        type: 'line',
        data: {
          labels: puntosX,
          datasets: [{ 
                      label: e_inicial 
                      ,data: puntosY
                      ,pointStyle:estilo_linea,
                      pointRadius: tam_marcador,borderColor: color_graf,borderWidth: grosor, fill: false}]
        },
        options: {
          //responsive: true,
          //maintainAspectRatio:false,
          scales: {
                  x:{display: true,title: {display: true,text: 'x'},
                    min: xmin,
                    max: xmax,
                    type: 'linear',
                    position: 'bottom',
                    ticks: {beginAtZero: false}
                    },
                  y: {display: true,title: {display: true,text: 'f(x)'}
                    }
                  },
                  plugins: {
                            title: {display: false},
                            legend: {
                              labels: {font: {size: 24, family: 'Georgia'}}
                            },
                            boxWidth: 30, // Ancho del cuadro gris
                            borderWidth: 3, // Ancho del borde del cuadro gris
                  }

        }
      });
      vecesx=1; 
}

function destruir(){
    if (graficoGenerado) {
      chart.destroy(); // Destruir la instancia del gráfico existente
      colorPicker.style.display = "none";  //solo ocultamos el colorpicker no lo borramos
      //horizontalScrollbar.parentNode.removeChild(horizontalScrollbar);
      //horizontalScrollbar.style.visibility = "hidden";
      horizontalScrollbar.style.display = "none";
      graficoGenerado = false;
      //ocultamos los tipos de linea
      selectElement1.style.display = "none";
      selectElement2.style.display = "none";
      selectElement3.style.display = "none";
      let div = document.getElementById('canvas_container');
      div.style.display = 'none';
      let div2 = document.getElementById('scrolls');
      div2.style.display = 'none';
    }
  }

  /////-----------------------------------------------------
function grosor_linea(){
    let selectElement = document.getElementById("grosor_linea");
    let selectedValue = selectElement.value;
    grosor=parseInt(selectedValue)
    llamado_grafico();
}
function marcador_linea(){
    let selectElement = document.getElementById("marcador_linea");
    estilo_linea= String(selectElement.value);
    llamado_grafico();

}
function tama_marcador(){
    let selectElement = document.getElementById("tam_marcador");
    let selectedValue = selectElement.value;
    tam_marcador=parseInt(selectedValue)
    llamado_grafico();
}
function filtrar_ast_desp(texto){
  let caract = ["1", "2", "3","4","5","6","7","8","9","0","s","c","t","p","a","e","L","x"];

  //texto="xsen(x)+2x+cos(3x)+xx"
  let lista = texto.split("");
  let n=lista.length;

  for (i=0 ; i<n;i++){
      if (lista[i]=="x"){
        if (caract.includes(lista[i+1])){
           lista.splice((i+1), 0, "*");
           n=n+1;
        }
      }
  }
  return lista.join("");
}

function filtrar_ast_ant(texto){
  let caract = ["1", "2", "3","4","5","6","7","8","9","0","s","c","t","p","a","e","L","x"];
  //let texto="xsen(x)+2x+cos(3x)+xx"
  let lista = texto.split("");
  let n=lista.length;

  for (i=1 ; i<n;i++){
      if (lista[i]=="x"){
        if (caract.includes(lista[i-1])){
           lista.splice(i, 0, "*");
           n=n+1;
        }
      }
  }
  return lista.join("");

}
//-----------------------------
function toggleDropdown() {
  var dropdownList = document.querySelector('.dropdown-list');
  dropdownList.classList.toggle('show');
}
