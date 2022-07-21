package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.AdminService;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final AdminService service;
    public AdminController(AdminService service) { this.service = service; }



    @GetMapping()
    public String showAllUser(Model model) {
        List<User> allUsers = service.getAllUsers();
        model.addAttribute("allUser", allUsers);
        return "admin";
    }

    //         ----------------------------------------------Add/Edit User----------------------------------------------     //
    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("roles", service.findAllRoles());
        return "user_info_table";
    }


    @GetMapping("/edit/{id}")
    public String editUser(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", service.getUserById(id));
        model.addAttribute("roles", service.findAllRoles());
        return "user_info_table";
    }


    @PostMapping("/save")
    public String saveUser(@ModelAttribute("user") User user) {
        service.saveUser(user);
        return "redirect:/admin";
    }
    //      ---------------------------------------------------------------------------------------------------------   //


    //    ----------------------------------------------Delete User---------------------------------------------------   //
    @PostMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        service.deleteUser(id);
        return "redirect:/admin";
    }
}

