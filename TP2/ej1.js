let Coches = document.getElementById('Coches');

function coche (marca, modelo, precio) {
    this.marca  = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.iva    = function () {
        return (precio*21)/100
    };
    this.imprimir=function () {
        Coches.innerHTML += ('<tr><td>'+this.marca+'</td><td>'+this.modelo+'<td>'+this.precio+'</td><td>'+this.iva()+'</td></tr>');
    }
};

let coche1 = new coche('Ford','Mustang',90000);
coche1.imprimir();

let coche2 = new coche('Ford','Falcon',25000);
coche2.imprimir();
