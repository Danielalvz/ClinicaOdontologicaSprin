package BackEnd.ClinicaOdontologica.repository;

import BackEnd.ClinicaOdontologica.entity.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {
    Optional<Odontologo> findByMatricula(String matricula);

    Optional<Odontologo> findByNombreAndApellido(String nombre, String apellido);
}
