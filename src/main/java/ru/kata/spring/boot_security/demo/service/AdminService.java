package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    private final UserRepository adminRepository;
    private final RoleRepository repository;
    private final PasswordEncoder bCrypt;

    public AdminService(UserRepository adminRepository, RoleRepository repository, PasswordEncoder bCrypt) {
        this.adminRepository = adminRepository;
        this.repository = repository;
        this.bCrypt = bCrypt;
    }



    public List<Role> findAllRoles() { return repository.findAll(); }

    public List<User> getAllUsers() {
        return adminRepository.findAll();
    }

    public void deleteUser(Long id) {
        adminRepository.deleteById(id);
    }

    public User getUserById(Long id) { return adminRepository.getOne(id); }

    public void saveUser(User user) {
        user.setPassword(bCrypt.encode(user.getPassword()));
        adminRepository.save(user);
    }

    public String RoleNames(User user) {
        List<Role> roles = user.getRoles().stream().toList();
        StringBuilder builder = new StringBuilder();

        roles.forEach(role -> builder.append(role.getName()).append(","));

        return builder.substring(0, (builder.length() - 1));
    }

}
