package com.bank.service;

import com.bank.model.Account;
import com.bank.model.Transaction;
import com.bank.repository.AccountRepository;
import com.bank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    // ── Deposit ──
    public Transaction deposit(String accountNumber, double amount) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found: " + accountNumber));

        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);

        Transaction t = new Transaction();
        t.setAccountNumber(accountNumber);
        t.setType("DEPOSIT");
        t.setAmount(amount);
        t.setBalanceAfter(account.getBalance());
        t.setDescription("Deposit of ₹" + amount);
        t.setStatus("SUCCESS");
        return transactionRepository.save(t);
    }

    // ── Withdraw ──
    public Transaction withdraw(String accountNumber, double amount) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found: " + accountNumber));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance!");
        }

        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);

        Transaction t = new Transaction();
        t.setAccountNumber(accountNumber);
        t.setType("WITHDRAW");
        t.setAmount(amount);
        t.setBalanceAfter(account.getBalance());
        t.setDescription("Withdrawal of ₹" + amount);
        t.setStatus("SUCCESS");
        return transactionRepository.save(t);
    }

    // ── Transfer ──
    public Transaction transfer(String fromAccount,
                                 String toAccount, double amount) {

        Account from = accountRepository.findByAccountNumber(fromAccount)
            .orElseThrow(() -> new RuntimeException("Source account not found!"));

        Account to = accountRepository.findByAccountNumber(toAccount)
            .orElseThrow(() -> new RuntimeException("Destination account not found!"));

        if (from.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance!");
        }

        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);
        accountRepository.save(from);
        accountRepository.save(to);

        Transaction t = new Transaction();
        t.setAccountNumber(fromAccount);
        t.setToAccountNumber(toAccount);
        t.setType("TRANSFER");
        t.setAmount(amount);
        t.setBalanceAfter(from.getBalance());
        t.setDescription("Transfer of ₹" + amount + " to " + toAccount);
        t.setStatus("SUCCESS");
        return transactionRepository.save(t);
    }

    // ── Get All Transactions ──
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByCreatedAtDesc();
    }

    // ── Get Transactions By Account ──
    public List<Transaction> getTransactionsByAccount(String accountNumber) {
        return transactionRepository
            .findByAccountNumberOrderByCreatedAtDesc(accountNumber);
    }
}