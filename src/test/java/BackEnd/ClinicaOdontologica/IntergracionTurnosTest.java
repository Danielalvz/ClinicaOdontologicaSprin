package BackEnd.ClinicaOdontologica.integration;

import BackEnd.ClinicaOdontologica.entity.Domicilio;
import BackEnd.ClinicaOdontologica.entity.Odontologo;
import BackEnd.ClinicaOdontologica.entity.Paciente;
import BackEnd.ClinicaOdontologica.entity.Turno;
import BackEnd.ClinicaOdontologica.service.OdontologoService;
import BackEnd.ClinicaOdontologica.service.PacienteService;
import BackEnd.ClinicaOdontologica.service.TurnoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
public class IntergracionTurnosTest {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private OdontologoService odontologoService;

    @Autowired
    private TurnoService turnoService;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testCrearYRecuperarTurno() throws Exception {
        // CREAR PACIENTE
        Paciente paciente = new Paciente("Jorgito", "Pereyra", "111111", LocalDate.of(2024, 6, 19),
                new Domicilio("Calle falsa", 123, "La Rioja", "Argentina"), "jorgito@digitalhouse.com");
        Paciente pacienteGuardado = pacienteService.guardarPaciente(paciente);

        // CREAR ODONTOLOGO
        Odontologo odontologo = new Odontologo("Carlos", "Gomez", "MAT1234");
        Odontologo odontologoGuardado = odontologoService.guardarOdontologo(odontologo);

        // CREAR TURNO
        Turno turno = new Turno();
        turno.setPaciente(pacienteGuardado);
        turno.setOdontologo(odontologoGuardado);
        turno.setFecha(LocalDate.of(2024, 6, 20));

        // TURNO JSOM
        String turnoJson = objectMapper.writeValueAsString(turno);

        // POST TURNO
        mockMvc.perform(post("/turnos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(turnoJson))
                .andExpect(status().isOk());

        // GET TURNO
        mockMvc.perform(get("/turnos/1") // Asegúrate de que este ID exista y coincida con el creado
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.paciente.nombre").value("Jorgito"))
                .andExpect(jsonPath("$.odontologo.nombre").value("Carlos"))
                .andExpect(jsonPath("$.fecha").value("2024-06-20"));
    }
}
