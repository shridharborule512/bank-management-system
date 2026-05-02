package com.bank.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @Column(nullable = false)
    private String accountType;  // SAVINGS or CURRENT

    @Column(nullable = false)
    private double balance;

    // ── Getters & Setters ──
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
 // Add this constructor in Account.java
    public Account(String name, int age, String accountType, 
                   double balance, String accountNumber) {
        this.name = name;
        this.age = age;
        this.accountType = accountType;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }

    // Also add a no-arg constructor (JPA needs this)
    public Account() {}

    @Override
    public String toString() {
        return "Account [id=" + id + ", name=" + name + ", age=" + age +
               ", accountNumber=" + accountNumber + ", type=" + accountType +
               ", balance=" + balance + "]";
    }
}