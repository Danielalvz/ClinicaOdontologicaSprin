package BackEnd.ClinicaOdontologica.security;

import BackEnd.ClinicaOdontologica.entity.Usuario;
import BackEnd.ClinicaOdontologica.entity.UsuarioRole;
import BackEnd.ClinicaOdontologica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatosIniciales implements ApplicationRunner {
@Autowired
private UsuarioRepository usuarioRepository;
@Autowired
private BCryptPasswordEncoder passwordEncoder;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        String passSinCifrar= "admin";
        String passCifrado= passwordEncoder.encode(passSinCifrar);
        Usuario usuario= new Usuario("dani", UsuarioRole.ROLE_ADMIN,passCifrado,"admin@admin.com","daniw");
        System.out.println("pass cifrado: "+passCifrado);
        usuarioRepository.save(usuario);

    }
}
