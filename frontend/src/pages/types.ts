export interface CartItem {
    productId: string;
    quantity: number;
  }
  

export interface Order {
_id: string;
totalPrice: number;
// Add other order properties if necessary
}
  
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'employee' | 'customer';
}

export type UserAction =
  | { type: 'LOGIN'; payload: IUser }
  | { type: 'LOGOUT' };