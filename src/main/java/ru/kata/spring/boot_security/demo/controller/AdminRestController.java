package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {


    private final AdminService service;
    public AdminRestController(AdminService service) { this.service = service; }

    @GetMapping("/userDetails")
    public User getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        return service.findByUserName(userDetails.getUsername());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> users = service.getAllUsers();

        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id")User user) {

        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable("id")User user) { service.deleteUser(user); }


    @PatchMapping("/users")
    public void saveUser(@RequestBody User user) { service.saveUser(user); }


}
