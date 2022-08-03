package ru.kata.spring.boot_security.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.service.AdminService;

@Controller
public class MainController {


@RequestMapping("/login")
public String showIndexString() { return "login"; }

}
