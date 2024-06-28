package BackEnd.ClinicaOdontologica.service;

import BackEnd.ClinicaOdontologica.entity.Paciente;
import BackEnd.ClinicaOdontologica.repository.PacienteRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    private static final Logger logger = Logger.getLogger(PacienteService.class);

    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente guardarPaciente(Paciente paciente) {
        logger.info("Guardando un nuevo paciente: " + paciente);
        return pacienteRepository.save(paciente);
    }
    public void actualizarPaciente(Paciente paciente) {
        logger.info("Actualizando el paciente con ID: " + paciente.getId());
        Optional<Paciente> pacienteExistente = pacienteRepository.findById(paciente.getId());
        if (pacienteExistente.isPresent()) {
            Paciente actualizado = pacienteExistente.get();
            actualizado.setNombre(paciente.getNombre());
            actualizado.setApellido(paciente.getApellido());
            actualizado.setCedula(paciente.getCedula());
            actualizado.setFechaIngreso(paciente.getFechaIngreso());
            actualizado.setDomicilio(paciente.getDomicilio());
            actualizado.setEmail(paciente.getEmail());
            pacienteRepository.save(actualizado);
            logger.info("Paciente actualizado: " + actualizado);
        } else {
            logger.warn("Paciente no encontrado");
        }
    }
    public Optional<Paciente> buscarPacientePorID(Long id) {
        logger.info("Buscando el paciente con ID: " + id);
        return pacienteRepository.findById(id);
    }
    public Optional<Paciente> buscarPorEmail(String email) {
        logger.info("Buscando el paciente con email: " + email);
        return pacienteRepository.findByEmail(email);
    }
    public void eliminarPaciente(Long id) {
        logger.info("Eliminando el paciente con ID: " + id);
        pacienteRepository.deleteById(id);
    }
    public List<Paciente> buscarTodos() {
        logger.info("Buscando todos los pacientes");
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> findByNombreAndApellido(String nombre, String apellido) {
        logger.info("Buscando el paciente con nombre y apellido: " + nombre + ' ' + apellido);
        return pacienteRepository.findByNombreAndApellido(nombre, apellido);
    }

}
