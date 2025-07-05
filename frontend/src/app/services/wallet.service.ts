import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../models/wallet.model';
import { Transaction } from '../models/transaction.model';
import { Block } from '../models/block.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'http://localhost:3000/api/wallets';

  constructor(private http: HttpClient) {}

  // Obtener wallet del usuario actual
  getWallet(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/me`);
  }

  // Obtener historial de transacciones del usuario
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  // Crear una nueva transacción
  createTransaction(toPublicKey: string, amount: number) {
    return this.http.post(`${this.baseUrl}/transactions`, { toPublicKey, amount });
  }

  // Métodos admin

  getAllWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${this.baseUrl}/all`);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/all-transactions`);
  }

  getBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(`${this.baseUrl}/blocks`);
  }
}
