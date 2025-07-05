import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { Transaction } from '../../models/transaction.model';
import { AdminWallet } from '../../models/admin-wallet.model';

interface Wallet {
  username: string;
  publicKey: string;
}

interface Block {
  index: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  transactions: any[];
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  wallets: AdminWallet[] = [];
  transactions: Transaction[] = [];
  blocks: Block[] = [];
  error: string = '';

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.loadWallets();
    this.loadTransactions();
    this.loadBlocks();
  }

  loadWallets() {
    this.walletService.getAllWallets().subscribe({
     next: (data: Wallet[]) => {
        this.wallets = data.map(w => ({
          username: (w as any).username,
          publicKey: w.publicKey
        }));
      },
      error: () => this.error = 'No se pudieron cargar las wallets.'
    });
  }

  loadTransactions() {
    this.walletService.getAllTransactions().subscribe({
      next: (data) => this.transactions = data,
      error: () => this.error = 'No se pudieron cargar las transacciones.'
    });
  }

  loadBlocks() {
    this.walletService.getBlocks().subscribe({
      next: (data) => this.blocks = data,
      error: () => this.error = 'No se pudieron cargar los bloques.'
    });
  }
}
