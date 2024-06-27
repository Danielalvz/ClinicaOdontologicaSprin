package BackEnd.ClinicaOdontologica.service;

import BackEnd.ClinicaOdontologica.entity.Odontologo;
import BackEnd.ClinicaOdontologica.entity.Paciente;
import BackEnd.ClinicaOdontologica.entity.Turno;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TurnoServiceTest {
    @Autowired
    private TurnoService turnoService;

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private OdontologoService odontologoService;

    @Test
    @Order(1)
    public void guardarTurno() {
        // Crea un paciente y odontólogo para el turno
        Paciente paciente = new Paciente("María", "Lopez", "222222", LocalDate.of(2023, 1, 1), null, "maria@digitalhouse.com");
        pacienteService.guardarPaciente(paciente);

        Odontologo odontologo = new Odontologo("Ana", "Ramirez", "MAT5678");
        odontologoService.guardarOdontologo(odontologo);

        Turno turno = new Turno();
        turno.setPaciente(paciente);
        turno.setOdontologo(odontologo);
        turno.setFecha(LocalDate.of(2024, 6, 20));

        Turno turnoGuardado = turnoService.guardarTurno(turno);
        assertNotNull(turnoGuardado.getId());
        assertEquals(paciente.getNombre(), turnoGuardado.getPaciente().getNombre());
    }

    @Test
    @Order(2)
    public void buscarTurnoPorId() {
        Long id = 1L; // Asegúrate de que el turno con ID 1 exista
        Optional<Turno> turnoBuscado = turnoService.buscarTurnoPorID(id);
        assertTrue(turnoBuscado.isPresent());
    }

    @Test
    @Order(3)
    public void actualizarTurnoTest() {
        Optional<Turno> turnoBuscado = turnoService.buscarTurnoPorID(1L);
        if (turnoBuscado.isPresent()) {
            turnoBuscado.get().setFecha(LocalDate.of(2024, 7, 1));
            turnoService.actualizarTurno(turnoBuscado.get());
        }
        assertEquals(LocalDate.of(2024, 7, 1), turnoBuscado.get().getFecha());
    }

    @Test
    @Order(4)
    public void buscarTodos() {
        List<Turno> turnos = turnoService.buscarTodos();
        assertFalse(turnos.isEmpty());
    }

    @Test
    @Order(5)
    public void eliminarTurno() {
        turnoService.eliminarTurno(1L);
        Optional<Turno> turnoBuscado = turnoService.buscarTurnoPorID(1L);
        assertFalse(turnoBuscado.isPresent());
    }
}
