package com.example.user_employee_management_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private int age;
    private int totalExperience;

    @Lob // For longer text
    private String pastExperience;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public int getTotalExperience() { return totalExperience; }
    public void setTotalExperience(int totalExperience) { this.totalExperience = totalExperience; }
    public String getPastExperience() { return pastExperience; }
    public void setPastExperience(String pastExperience) { this.pastExperience = pastExperience; }
}