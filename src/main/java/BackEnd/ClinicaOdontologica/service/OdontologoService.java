package BackEnd.ClinicaOdontologica.service;

import BackEnd.ClinicaOdontologica.entity.Odontologo;
import BackEnd.ClinicaOdontologica.repository.OdontologoRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
    private static final Logger logger = Logger.getLogger(OdontologoService.class);

    @Autowired
    private OdontologoRepository odontologoRepository;

    public Odontologo guardarOdontologo(Odontologo odontologo) {
        logger.info("Guardando un nuevo odontologo: " + odontologo);
        return odontologoRepository.save(odontologo);
    }

    public void actualizarOdontologo(Odontologo odontologo) {
        Optional<Odontologo> odontologoExistente = odontologoRepository.findById(odontologo.getId());
        if (odontologoExistente.isPresent()) {
            Odontologo actualizado = odontologoExistente.get();
            actualizado.setMatricula(odontologo.getMatricula());
            actualizado.setNombre(odontologo.getNombre());
            actualizado.setApellido(odontologo.getApellido());
            odontologoRepository.save(actualizado);
            logger.info("Odontologo actualizado: " + actualizado);
        } else {
            logger.warn("Odontologo no encontrado");
        }
    }

    public Optional<Odontologo> buscarOdontologoPorID(Long id) {
        logger.info("Buscando el odontologo con ID: " + id);
        return odontologoRepository.findById(id);
    }

    public Optional<Odontologo> buscarPorMatricula(String matricula) {
        logger.info("Buscando el odontologo con matricula: " + matricula);
        return odontologoRepository.findByMatricula(matricula);
    }

    public void eliminarOdontologo(Long id) {
        logger.info("Eliminando el odontologo con ID: " + id);
        odontologoRepository.deleteById(id);
    }

    public List<Odontologo> buscarTodos() {
        logger.info("Buscando todos los odontologos");
        return odontologoRepository.findAll();
    }
}
