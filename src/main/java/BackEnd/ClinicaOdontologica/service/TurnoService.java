package BackEnd.ClinicaOdontologica.service;

import BackEnd.ClinicaOdontologica.entity.Turno;
import BackEnd.ClinicaOdontologica.repository.TurnoRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    private static final Logger logger = Logger.getLogger(TurnoService.class);
    @Autowired
    private TurnoRepository turnoRepository;

    public Turno guardarTurno(Turno turno) {
        logger.info("Guardando un nuevo turno: " + turno);
        return turnoRepository.save(turno);
    }

    public void actualizarTurno(Turno turno) {
        Optional<Turno> turnoExistente = turnoRepository.findById(turno.getId());
        if (turnoExistente.isPresent()) {
            Turno actualizado = turnoExistente.get();
            actualizado.setPaciente(turno.getPaciente());
            actualizado.setOdontologo(turno.getOdontologo());
            actualizado.setFecha(turno.getFecha());
            turnoRepository.save(actualizado);
            logger.info("Turno actualizado: " + actualizado);
        } else {
            logger.warn("Turno no encontrado");
        }
    }

    public Optional<Turno> buscarTurnoPorID(Long id) {
        logger.info("Buscando el turno con ID: " + id);
        return turnoRepository.findById(id);
    }

    // Buscar un turno por paciente ID
    public List<Turno> buscarPorPacienteID(Long pacienteId) {
        logger.info("Buscando el turno con paciente de ID: " + pacienteId);
        return turnoRepository.findByPacienteId(pacienteId);
    }

    public void eliminarTurno(Long id) {
        logger.info("Eliminando el turno con ID: " + id);
        turnoRepository.deleteById(id);
    }

    public List<Turno> buscarTodos() {
        logger.info("Buscando todos los turnos");
        return turnoRepository.findAll();
    }
}
