package com.bank.controller;

import com.bank.model.Transaction;
import com.bank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transaction")
//@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"})
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // ── Deposit ──
    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody Map<String, Object> body) {
        try {
            String accountNumber = (String) body.get("accountNumber");
            double amount = Double.parseDouble(body.get("amount").toString());
            return ResponseEntity.ok(transactionService.deposit(accountNumber, amount));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ── Withdraw ──
    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody Map<String, Object> body) {
        try {
            String accountNumber = (String) body.get("accountNumber");
            double amount = Double.parseDouble(body.get("amount").toString());
            return ResponseEntity.ok(transactionService.withdraw(accountNumber, amount));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ── Transfer ──
    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody Map<String, Object> body) {
        try {
            String fromAccount = (String) body.get("fromAccount");
            String toAccount   = (String) body.get("toAccount");
            double amount = Double.parseDouble(body.get("amount").toString());
            return ResponseEntity.ok(
                transactionService.transfer(fromAccount, toAccount, amount));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ── Get All (Admin only) ──
    @GetMapping("/all")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // ── Get By Account Number ──
    @GetMapping("/{accountNumber}")
    public ResponseEntity<?> getByAccount(@PathVariable String accountNumber) {
        try {
            return ResponseEntity.ok(
                transactionService.getTransactionsByAccount(accountNumber));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}