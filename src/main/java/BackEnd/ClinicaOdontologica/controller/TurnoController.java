package BackEnd.ClinicaOdontologica.controller;

import BackEnd.ClinicaOdontologica.entity.Odontologo;
import BackEnd.ClinicaOdontologica.entity.Paciente;
import BackEnd.ClinicaOdontologica.entity.Turno;
import BackEnd.ClinicaOdontologica.service.OdontologoService;
import BackEnd.ClinicaOdontologica.service.PacienteService;
import BackEnd.ClinicaOdontologica.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turno")
public class TurnoController {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private OdontologoService odontologoService;


    @GetMapping
    public ResponseEntity<List<Turno>> listarTodosLosTurnos() {
        return ResponseEntity.ok(turnoService.buscarTodos());
    }

//    @PostMapping
//    public ResponseEntity<Turno> registrarUnTurno(@RequestBody Turno turno) {
//        Optional<Paciente> paciente = pacienteService.buscarPacientePorID(turno.getPaciente().getId());
//        Optional<Odontologo> odontologo = odontologoService.buscarOdontologoPorID(turno.getOdontologo().getId());
//
//        if(paciente.isPresent() && odontologo.isPresent()) {
//            return ResponseEntity.ok(turnoService.guardarTurno(turno));
//        } else {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PostMapping
    public ResponseEntity<Turno> registrarUnTurno(@RequestBody Turno turno) {
        if (turno.getPaciente() != null && turno.getPaciente().getId() != null &&
                turno.getOdontologo() != null && turno.getOdontologo().getId() != null) {

            Optional<Paciente> paciente = pacienteService.buscarPacientePorID(turno.getPaciente().getId());
            Optional<Odontologo> odontologo = odontologoService.buscarOdontologoPorID(turno.getOdontologo().getId());

            if (paciente.isPresent() && odontologo.isPresent()) {
                turno.setPaciente(paciente.get());
                turno.setOdontologo(odontologo.get());
                Turno nuevoTurno = turnoService.guardarTurno(turno);
                return ResponseEntity.ok(nuevoTurno);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<String> actualizarTurno(@RequestBody Turno turno) {
        Optional<Turno> turnoBuscado = turnoService.buscarTurnoPorID(turno.getId());
        if (turnoBuscado.isPresent()) {
            turnoService.actualizarTurno(turno);
            return ResponseEntity.ok().body("Turno actualizado");
        } else {
            return ResponseEntity.badRequest().body("Turno no encontrado");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turno> buscarTurnoPorId(@PathVariable Long id) {
        Optional<Turno> turnoBuscado = turnoService.buscarTurnoPorID(id);
        if (turnoBuscado.isPresent()) {
            return ResponseEntity.ok(turnoBuscado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarTurno(@PathVariable Long id) {
        Optional<Turno> turnoBuscado = turnoService.buscarTurnoPorID(id);
        if (turnoBuscado.isPresent()) {
            turnoService.eliminarTurno(id);
            return ResponseEntity.ok().body("Turno eliminado");
        } else {
            return ResponseEntity.badRequest().body("Turno no encontrado");
        }
    }
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Turno>> buscarTurnosPorPacienteId(@PathVariable Long pacienteId) {
        List<Turno> turnos = turnoService.buscarPorPacienteID(pacienteId);
        if (turnos.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(turnos);
        }
    }
}
