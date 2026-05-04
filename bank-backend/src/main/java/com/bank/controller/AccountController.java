package com.bank.controller;

import com.bank.model.Account;
import com.bank.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // ── Hello Test ──
    @GetMapping("/hello")
    public String hello() {
        return "Hello! Bank Management API is running!";
    }

    // ── Create Account ──
    @PostMapping("/create")
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

 // ── Create Multiple Accounts ──
    @PostMapping("/create-all")
    public List<Account> createMultipleAccounts(@RequestBody List<Account> accounts) {
        return accountService.createMultipleAccounts(accounts);
    }
    // ── Get All Accounts ──
    @GetMapping("/all")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // ── Get By ID ──
    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable int id) {
        return accountService.getAccountById(id);
    }

    // ── Update Account ──
    @PutMapping("/update/{id}")
    public Account updateAccount(@PathVariable int id,
                                  @RequestBody Account account) {
        return accountService.updateAccount(id, account);
    }

    // ── Delete Account ──
    @DeleteMapping("/delete/{id}")
    public String deleteAccount(@PathVariable int id) {
        return accountService.deleteAccount(id);
    }
}