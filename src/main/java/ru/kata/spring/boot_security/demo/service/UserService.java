package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;




@Transactional
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) { this.userRepository = userRepository;}


    public User findByUserName(String email) {return userRepository.findByEmailAddress(email); }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAddress(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User with email: %s not exist", email));
        }
        return new org.springframework.security.core.userdetails.User(user.getEmailAddress(), user.getPassword(),user.getAuthorities());
    }

}
