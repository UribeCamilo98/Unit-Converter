//Definimos unidades por categoria
const unidades = {
    longitud: ["Metros","Kilometros","Millas","Pies","Pulgadas"],
    peso: ["Kilogramos","Gramos","Libras","Onzas"],
    temperatura: ["Celsius","Fahrenheit","Kelvin"],
};

//Obtenemos los elementos del DOM
const categoriaSelect = document.getElementById("categoria");
const unidad1Select = document.getElementById("unidad1");
const unidad2Select = document.getElementById("unidad2");


//Funcion para actualizar los selects de unidades
function actualizarUnidades(){
    const categoria = categoriaSelect.value;

    //Limpiamos los selects anteriores
    unidad1Select.innerHTML='<option value="">Seleccione una unidad</option>';
    unidad2Select.innerHTML='<option value="">Seleccione una unidad</option>';

    //condiciona para llenar la opciones
    if(categoria && unidades[categoria]){
        unidades[categoria].forEach(unidad=>{
            let option1= new Option(unidad, unidad.toLowerCase());
            let option2= new Option(unidad, unidad.toLowerCase());
            unidad1Select.add(option1);
            unidad2Select.add(option2);
        });
    }
}

categoriaSelect.addEventListener("change", actualizarUnidades);