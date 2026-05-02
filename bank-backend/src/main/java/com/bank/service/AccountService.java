package com.bank.service;

import com.bank.model.Account;
import com.bank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // ── Create Account ──
    public Account createAccount(Account account) {
        // Auto-generate account number
        String accNumber = "ACC" + (100000 + new Random().nextInt(900000));
        account.setAccountNumber(accNumber);
        return accountRepository.save(account);
    }
 // ── Save Multiple ──
    public List<Account> createMultipleAccounts(List<Account> accounts) {
        accounts.forEach(acc -> {
            String accNumber = "ACC" + (100000 + new Random().nextInt(900000));
            acc.setAccountNumber(accNumber);
        });
        return accountRepository.saveAll(accounts);
    }

    // ── Get All Accounts ──
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // ── Get Account By ID ──
    public Account getAccountById(int id) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            return account.get();
        } else {
            throw new RuntimeException("Account not found with id: " + id);
        }
    }

    // ── Update Account ──
    public Account updateAccount(int id, Account updatedAccount) {
        Account existing = getAccountById(id);
        existing.setName(updatedAccount.getName());
        existing.setAge(updatedAccount.getAge());
        existing.setAccountType(updatedAccount.getAccountType());
        existing.setBalance(updatedAccount.getBalance());
        return accountRepository.save(existing);
    }

    // ── Delete Account ──
    public String deleteAccount(int id) {
        getAccountById(id); // throws error if not found
        accountRepository.deleteById(id);
        return "Account deleted successfully with id: " + id;
    }
}