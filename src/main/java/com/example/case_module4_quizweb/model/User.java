package com.example.case_module4_quizweb.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "userTable")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String confirmPassword;
    private boolean enabled = true;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> roles;

    private String fullName;

    @Email
    private String email;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateOfBirth;

    private String avatar;

    private String address;
    @NotNull
    private int status;
//    (1 là đang hoạt động,2 là block)

    public User() {
    }

    public User(Long id, String username, String password, String confirmPassword, boolean enabled, Set<Role> roles, String fullName, String email, LocalDate dateOfBirth, String avatar, String address, int status) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.enabled = enabled;
        this.roles = roles;
        this.fullName = fullName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.avatar = avatar;
        this.address = address;
        this.status = status;
    }

    public User(String username, String password, String confirmPassword, boolean enabled, Set<Role> roles, String fullName, String email, LocalDate dateOfBirth, String avatar, String address, int status) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.enabled = enabled;
        this.roles = roles;
        this.fullName = fullName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.avatar = avatar;
        this.address = address;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
