const debug = require('debug');
const subjects = [];

//logger
const logger = debug('class-api:subjects');

const listaMaterias = (()=>{
    logger('Se ha enviado el listado de materias');
    return subjects;
});

const crearMaterias = ((materia)=>{
    subjects.push(materia);
    logger('Se ha creado al materia ', materia)
    return "Se ha creado la materia"
});

const editarMateria = ((materia)=>{
    const indexOfMateria = subjects.indexOf(subjects.find((mate)=> mate.id === materia.id));

    if (indexOfMateria >= 0){
        subjects[indexOfMateria] = materia
        logger('Se ha editado la materia',subjects[indexOfMateria].nombre)
        return "Se ha editado la materia"
    } else{
        return "No se ha encontrado la materia"
    }

});

const eliminarMateria = ((id)=>{
    const indexOfMateria = subjects.indexOf(subjects.find((mate)=> mate.id === id));

    if (indexOfMateria >= 0){
        subjects.splice(indexOfMateria,1);
        return "Se ha eliminado la materia"
    } else{
        return "No se ha encontrado la materia"
    }
});

module.exports = {
    listaMaterias,
    crearMaterias,
    editarMateria,
    eliminarMateria,
    subjects
}