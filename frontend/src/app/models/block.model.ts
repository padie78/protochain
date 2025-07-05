export interface Block {
  index: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  transactions: any[]; // o un tipo más específico si tenés
}
