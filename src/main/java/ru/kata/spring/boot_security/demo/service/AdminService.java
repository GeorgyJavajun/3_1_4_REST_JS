package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository adminRepository;
    private final RoleRepository repository;

    public AdminService(UserRepository adminRepository, RoleRepository repository) {
        this.adminRepository = adminRepository;
        this.repository = repository;
    }



    public List<Role> findAllRoles() { return repository.findAll(); }

    public List<User> getAllUsers() {
        return adminRepository.findAll();
    }

    public void saveUser(User user) {
        adminRepository.save(user);
    }

    public void deleteUser(Long id) {
        adminRepository.deleteById(id);
    }

    public User getUserById(Long id) { return adminRepository.getOne(id); }

}
