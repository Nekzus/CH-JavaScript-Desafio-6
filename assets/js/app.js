
//**** DESCRIPCIÓN DE ENTREGA ****/
//** En este desafio #6 sobre la base del desafio anterior, agregue un array para almacenar los objetos creados en el contructor. A a su vez aplique mediante un boton en el HTML la posibilidad */
//** de eliminar los items mediante delete seleccionando el numero de item. Aplicando un metodo filter sobre el array, logre verificar la existencia del item antes de su borrado.*/

//**** DECLARACION DE VARIABLES GLOBALES ****/
const btnEjec = document.querySelector('#btnEjec'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de ejecucion, y bootstrap.
const btnDelet = document.querySelector('#btnDelet'); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrado, y bootstrap.
let listadoJuegos = []; // Array que almacena los items ingresados por el usuario a modo de objetos.
let confirmacion1 = true; // Confirmacion de creación de Nuevo Item.
let confirmacion2 = true; // Confirmacion de Borrado.
let idItm = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto.
let itemBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario.

btnEjec.addEventListener('click', () => { // Llamado ejecucion del script mediante click del boton en el HTML.

//**** OBJECT CONSTRUCTOR ****/
class VideoJuego {
    constructor(idItm, titulo, plataforma, genero, anio, stock){  // Recibe los datos ingresados por prompts.
        this.idItm = idItm;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.genero = genero;
        this.anio = anio;
        this.stock = stock;
    }
    printConsole(){ // Método impresion en consola de las propiedades y datos de los objetos.
        console.log(`%cITEM #${this.idItm}`,'color: black; font-weight: bold; background:#0f0;'); // Se aplica un poco de estilo al encabezado en consola.
        console.log(`TÍTULO: ${this.titulo}\nPLATAFORMA: ${this.plataforma}\nGENERO: ${this.genero}\nAÑO: ${this.anio}\nSTOCK: ${this.stock}\n----------------------------\n`);
    
    }
}

//**** FUNCIÓN DE SOLICITUD DE INGRESO DE DATOS ****/
const ingresarDatos = () => {

    let titulo = prompt('Ingrese nombre videojuego.', 'MORTAL KOMBAT 4'); // Se solicita nombre videojuego, se carga un valor por defecto para facilitar la revisión del desafio.
    titulo === null ? titulo ='SIN NOMBRE' : titulo = titulo.toUpperCase(); // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un 'SIN NOMBRE' en la variable.
    
    let plataforma = prompt('Ingrese plataforma videojuego.', 'PC'); // Se solicita la plataforma, se carga un valor por defecto para facilitar la revisión del desafio.
    plataforma === null ? plataforma ='SIN PLATAFORMA' : plataforma = plataforma.toUpperCase(); // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un 'SIN PLATAFORMA' en la variable.

    let genero = prompt('Ingrese genero videojuego.', 'ACCION'); // Se solicita genero, se carga un valor por defecto para facilitar la revisión del desafio.
    genero === null ? genero = 'SIN GENERO' : genero = genero.toUpperCase(); // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un 'SIN GENERO' en la variable.

    let anio = parseInt(prompt('Ingrese año videojuego.', 1997)); // Se solicita año, se carga un valor por defecto para facilitar la revisión del desafio.
    isNaN(anio) ? anio = 0 : anio = anio; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un valor de 0 en la variable.

    let stock = parseInt(prompt('Ingrese stock videojuego.', 120)); // Se solicita stock, se carga un valor por defecto para facilitar la revisión del desafio.
    isNaN(stock) ? stock = 0 : stock = stock; // Con fines prácticos, en caso de seleccionar la cancelacion del prompt, se cargara un valor de 0 en la variable.
    

    return {titulo , plataforma, genero, anio, stock} ; // Retorna mediante un objeto literal los datos ingresados.
}

//**** RAMA PRINCIPAL DE EJECUCIÓN DEL SCRIPT ****/
do { // Mediante el do.. while se solicita al menos la creación de un objeto, y se pregunta al usuario si desea continuar con la ejecución.
    const {titulo, plataforma, genero, anio, stock} = ingresarDatos(); // Se realiza la desestructuración del objeto literal recibido de la funcion ingresarDatos.

    if(titulo === '' ) { // Se controla que el dato del nombre del video juego no este vacio.

    console.warn('Error: Item no valido - Debe asignar un Nombre al item.'); // De encontrarse vacio, se envia una advertencia en consola y se vuelve a solicitar el ingreso de los datos.

    } else { // Caso contrario:

    idItm++ // ... se incrementa el identificador del item (declarado en forma global), y se envia junto con los demas datos al constructor.
    let itemGame = new VideoJuego(idItm, titulo, plataforma, genero, anio , stock); // Nuevo objeto creado.
    listadoJuegos.push(itemGame);
    itemGame.printConsole(); // Se llama el método para la impresion en consola del ojeto.

    }
    
   confirmacion1 = confirm("Desea ingresar un nuevo item?"); // Se pregunta al usuario si desea continuar con la ejecución del script.

} while(confirmacion1);
    console.log('%cLISTADO DE ITEMS INGRESADOS', 'color: white; font-size: 16px; font-weight: bold; background: blue;');
    console.table(listadoJuegos); // Se muestra listado (array) en consola con los items en modo tabla.

}); // Cierre alcance ejecución boton de ejecucion en el HTML.

btnDelet.addEventListener('click', () => { // Llamado borrado de items mediante click del boton en el HTML.

//**** BORRADO DE ITEMS SELECCIONADOS POR EL USUARIO ****/
    do{
        itemBorrar = parseInt (prompt("Ingrese el número de item a borrar")); // Se solicita al usuario el numero de item a borrar.

        const items = listadoJuegos.filter( item =>{ // Se verifica la existencia del item dentro del array de almacenamiento.
            return item.idItm === itemBorrar;
        })

        if(isNaN(itemBorrar)) { // En caso de cancelacion del borrado, se sale del do... while.
            confirmacion2 = false
        } else if (items.length > 0) { // Si se comprueba la existencia del item a borrar, se procede con el borrado
            confirmacion2 = confirm(`Desea quitar item #${itemBorrar} del listado?`); // Se confirma si en verdad se desea borrar.
            switch (confirmacion2) { // En caso de cancelar el borrado se sale del do...while sin ejecutar el borrado.
                case true:
                let i = itemBorrar - 1; // Obtengo el numero de posicion en el array del item a borrar.
                delete listadoJuegos[i]; // Ejecuto el borrado.
                console.log('%cLISTADO DE ITEMS INGRESADOS', 'color: white; font-size: 16px; font-weight: bold; background: blue;'); 
                console.table(listadoJuegos); // Se muestra nuevo listado (array) en consola sin los items eliminados, en modo tabla.
            }
        } else {
            alert(`El item #${itemBorrar} no existe en el listado`); // Se avisa de la inexistencia del item dentro del listado en el array.
        }
    } while(confirmacion2); // Espera confirmacion de cancelacion del borrado.
}); // Cierre alcance ejecución boton de ejecucion en el HTML.
