package BackEnd.ClinicaOdontologica.service;

import BackEnd.ClinicaOdontologica.entity.Odontologo;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OdontologoServiceTest {
    @Autowired
    private OdontologoService odontologoService;

    @Test
    @Order(1)
    public void guardarOdontologo() {
        Odontologo odontologo = new Odontologo("Carlos", "Gomez", "MAT1234");
        Odontologo odontologoGuardado = odontologoService.guardarOdontologo(odontologo);
        assertNotNull(odontologoGuardado.getId());
        assertEquals("Carlos", odontologoGuardado.getNombre());
    }

    @Test
    @Order(2)
    public void buscarOdontologoPorId() {
        Long id = 1L; // Asegúrate de que el odontólogo con ID 1 exista
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(id);
        assertTrue(odontologoBuscado.isPresent());
    }

    @Test
    @Order(3)
    public void actualizarOdontologoTest() {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(1L);
        if (odontologoBuscado.isPresent()) {
            odontologoBuscado.get().setApellido("Perez");
            odontologoService.actualizarOdontologo(odontologoBuscado.get());
        }
        assertEquals("Perez", odontologoBuscado.get().getApellido());
    }

    @Test
    @Order(4)
    public void buscarTodos() {
        List<Odontologo> odontologos = odontologoService.buscarTodos();
        assertFalse(odontologos.isEmpty());
    }

    @Test
    @Order(5)
    public void eliminarOdontologo() {
        odontologoService.eliminarOdontologo(1L);
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorID(1L);
        assertFalse(odontologoBuscado.isPresent());
    }
}
