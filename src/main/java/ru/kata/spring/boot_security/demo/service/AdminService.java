package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository adminRepository;
    public AdminService(UserRepository adminRepository) { this.adminRepository = adminRepository; }


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
