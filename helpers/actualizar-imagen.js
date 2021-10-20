const fs = require('fs'); //para leer archivos y carpetas del filesystem
const Usuario = require('../models/usuario.model');
const Docente = require('../models/docente.model');
const Alumno = require('../models/alumno.model');
//const Carrera = require('../models/carrera.model');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipoColeccion, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipoColeccion) {
        case 'alumnos':
            const alumno = await Alumno.findById(id);
            if (!alumno) {
                console.log('Id de alumno no encontrado');
                return false;
            }
            pathViejo = `./uploads/alumnos/${alumno.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            alumno.img = nombreArchivo;
            await alumno.save();
            return true;
            break;

        case 'docentes':
            const docente = await Docente.findById(id);
            if (!docente) {
                console.log('Id de docente no encontrado');
                return false;
            }
            pathViejo = `./uploads/docentes/${docente.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            docente.img = nombreArchivo;
            await docente.save();
            return true;

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('Id de usuario no encontrado');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}