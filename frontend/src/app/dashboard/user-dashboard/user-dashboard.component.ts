import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {
  walletPublicKey: string = '';
  transactions: Transaction[] = [];
  txForm: FormGroup;
  error: string = '';
  success: string = '';

  constructor(private walletService: WalletService, private fb: FormBuilder) {
    this.txForm = this.fb.group({
      toPublicKey: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.loadWallet();
    this.loadTransactions();
  }

  loadWallet() {
    this.walletService.getWallet()?.subscribe({
      next: wallet => this.walletPublicKey = wallet,
      error: () => this.error = 'No se pudo cargar la wallet.'
    });
  }

  loadTransactions() {
    this.walletService.getTransactions().subscribe({
      next: txs => this.transactions = txs,
      error: () => this.error = 'No se pudieron cargar las transacciones.'
    });
  }

  submitTransaction() {
    this.error = '';
    this.success = '';
    if (this.txForm.invalid) return;

    const { toPublicKey, amount } = this.txForm.value;
    this.walletService.createTransaction(toPublicKey, amount).subscribe({
      next: () => {
        this.success = 'Transacción enviada correctamente.';
        this.txForm.reset();
        this.loadTransactions();
      },
      error: err => this.error = err.error?.error || 'Error al enviar la transacción.'
    });
  }
}
