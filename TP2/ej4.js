function Jugador (nombre) {
    this.nombre = nombre;
    this.pv = 100;
    this.sp = 100;
    this.curar = function(objetivo) {
        objetivo.pv += 25;
        this.sp -= 35;
        console.log(this.nombre+' curo a '+objetivo.nombre);
        console.log('Los puntos de vida de '+objetivo.nombre+' son: '+objetivo.pv);
        console.log('Los puntos de habilidad de '+this.nombre+' son: '+objetivo.sp);
    };
    this.tirarflecha = function(objetivo) {
        objetivo.pv -= 25;
        this.sp -= 15;
        console.log(this.nombre+' lanzo una flecha sobre '+objetivo.nombre);
        console.table('Los puntos de vida del '+objetivo.nombre+' son: '+objetivo.pv);
        console.table('Los puntos de habilidad de '+this.nombre+' son: '+objetivo.sp);
    };
    this.descansar = function() {this.sp = 100};
};



function IniciarPartida() {
    let orco = new Jugador("el Orco");
    let legolas = new Jugador("Legolas");
    let accion;
    let accionorco;
    let objetivoseleccionado;
    console.log('Tu nombre es legolas, debes acabar con la vida del Orco.');
    console.log('Para ello puedes curarte o tirar flechas.');
    console.log('Tus puntos de vida son: '+legolas.pv+' y tus puntos de habilidad: '+legolas.sp);
    while (legolas.pv > 0 && orco.pv > 0) {
        console.group();
        console.warn('¡Tu turno!');
        if (legolas.sp > 0) {
            accion = prompt('Quiere curar o atacar?','atacar');
            accion = accion.toLowerCase();
            objetivoseleccionado = prompt('A quien desea '+accion+'?','Orco');
            objetivoseleccionado = objetivoseleccionado.toLowerCase();
            if (accion == 'atacar' && objetivoseleccionado == 'orco') {
                legolas.tirarflecha(orco);
            } else if (accion == 'atacar') {
                console.log('Solo puedes atacar al orco.')
            } else if (accion == 'curar' && objetivoseleccionado != 'orco') {
                legolas.curar(legolas);
            } else if (accion == 'curar' && objetivoseleccionado == 'orco') {
                legolas.curar(orco);
            } else {
                console.log('Solo puedes usar curar o atacar sobre legolas (tu) o el orco.');
            };
            accion = '';
            objetivoseleccionado = '';
        } else {
            console.log ('Te has quedado sin puntos de habilidad, deberas esperar un turno.');
            legolas.descansar();
        }
        if (orco.sp > 0) {
            console.warn('!Turno de tu rival!');
            accionorco = Math.round(Math.random());
            if (accionorco == 1) {
                orco.tirarflecha(legolas);
            } else {
                orco.curar(orco);
            }
            accionorco = 2;
        } else {
            orco.descansar();
        }
    console.groupEnd();
    };
    if (legolas.pv > 0) {
        alert('Has ganado!');
    } else {
        alert("Has sido derrotado por el orco.");
    }
};