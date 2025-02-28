//Definimos unidades por categoria
const unidades = {
    longitud: ["Metros","Kilometros","Millas","Pies","Pulgadas"],
    peso: ["Kilogramos","Gramos","Libras","Onzas"],
    temperatura: ["Celsius","Fahrenheit","Kelvin"],
};

//Definimos los factores de conversion para longitud y peso
const factoresConversion={
    longitud:{
        metros:{ kilometros:0.001, millas: 0.000621371, pies:3.28084, pulgadas:39.3701},
        kilometros:{ metros: 1000 ,  millas: 0.621371 , pies: 3280.84 , pulgadas:39370.1},
        millas:{ metros: 1609.34 , kilometros: 1.60934, pies: 5280, pulgadas:63360},
        pies:{metros:0.3048, kilometros:0.0003048, millas:0.000189394,pulgadas:12},
        pulgadas:{metros:0.0254, kilometros:0.0000254, millas: 0.0000157828, pies: 0.0833333}
    },
    peso:{
        kilogramos:{gramos:1000, libras: 2.20462, onzas:35.274},
        gramos:{kilgramos:0.001, libras:0.00220462, onzas:0.035274},
        libras:{kilogramos:0.453592, gramos:435.592, onzas:16},
        onzas:{kilogramos:0.0283495,gramos:28.3495,libras:0.0625}
    }
};
//Elementos para la conversion de unidades
const cantidadInput= document.querySelector("input[type='number']");
const convertirBtn = document.querySelector("button");
const resultadoInput = document.querySelector(".resultado");

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

// Funcion que realiza las conversiones
function convertir() {
    const cantidad = parseFloat(cantidadInput.value);
    const unidad1=unidad1Select.value;
    const unidad2=unidad2Select.value;
    const categoria= categoriaSelect.value;
    
// se verifica que los valores dados si sean validos
    if(isNaN(cantidad)|| !unidad1 || !unidad2 || unidad1 === unidad2){
        resultadoInput.value= "Seleccione valores Validos";
        return;
    }
    
    //veriicacion de que la categoria existe en el objeto factoresConversion para las categorias longitud y peso
    if(factoresConversion[categoria]&&factoresConversion[categoria][unidad1] && factoresConversion[categoria][unidad2]){
        const factor = factoresConversion[categoria][unidad1][unidad2];
         const resultado = cantidad*factor;
        
        resultadoInput.value=resultado + " " + [unidad2];

    }else if (categoria ==="temperatura"){

        //conversiones de celsius
        if(unidad1==="celsius" && unidad2==="fahrenheit"){
            const cToF = (cantidad*(9/5))+32;
            
            resultadoInput.value=cToF + " "+ unidad2;
            }
            
        if(unidad1==="celsius" && unidad2==="kelvin"){
                const cToK = cantidad + 273.15;
                resultadoInput.value=cToK + " " + unidad2;
                }
        //conversiones de fahrenheit  
        if(unidad1==="fahrenheit" && unidad2==="celsius"){
                    const fToC = (cantidad-32)*(5/9);

                    resultadoInput.value=fToC + " " + unidad2;
                    }
        if(unidad1==="fahrenheit" && unidad2==="kelvin"){
                        const fToK = ((cantidad-32)+(5/9))+273+15;
    
                        resultadoInput.value=fToK + " " + unidad2;
                        }
        //conversiones de Kelvin
        if(unidad1==="kelvin" && unidad2==="celsius"){
            const kToC = cantidad - 273.15;

            resultadoInput.value=kToC + " " + unidad2;
            }
        if(unidad1==="kelvin" && unidad2==="fahrenheit"){
                const kToF = ((cantidad - 273.15)*(9/5))+32;
    
                resultadoInput.value=kToF + " " + unidad2;
                }   
        }else{
        resultadoInput.value = "Conversion No disponible";
}
}

categoriaSelect.addEventListener("change", actualizarUnidades);
convertirBtn.addEventListener("click",convertir);