export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Misc = 'Misc'
}

export enum Status {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

export interface Item {
  id?: number;
  name: string;
  category: Category;
  quantity: number;
  price: number;
  supplier: string;
  status: Status;
  featured: number;
  notes?: string;
}