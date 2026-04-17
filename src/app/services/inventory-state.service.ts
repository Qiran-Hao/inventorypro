import { Injectable } from '@angular/core';
import { Item, Category, Status } from '../models/item.model';

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface InventoryItemView {
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  status: InventoryStatus;
  featured?: boolean;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class InventoryStateService {
  private readonly storageKey = 'inventorypro_items_v2_en';

  private readonly defaultItems: InventoryItemView[] = [
    { name: 'iPhone 17 Pro', category: 'Electronics', quantity: 126, price: 7999, supplier: 'Apple Supply Chain', status: 'In Stock', featured: true, icon: 'phone-portrait-outline' },
    { name: 'Wireless Drill Kit', category: 'Tools', quantity: 18, price: 299, supplier: 'Bayan Tools Factory', status: 'Low Stock', featured: true, icon: 'construct-outline' },
    { name: 'Sports T-Shirt (XL)', category: 'Clothing', quantity: 0, price: 69, supplier: 'Yingfeng Apparel', status: 'Out of Stock', icon: 'shirt-outline' },
    { name: 'Ergonomic Chair', category: 'Furniture', quantity: 16, price: 899, supplier: 'Comfort Living', status: 'In Stock', featured: true, icon: 'fitness-outline' },
    { name: 'USB-C Data Cable', category: 'Electronics', quantity: 7, price: 29, supplier: 'FlashLink Tech', status: 'Low Stock', icon: 'git-network-outline' }
  ];

  private items: InventoryItemView[] = this.loadItems();

  getItems(): InventoryItemView[] {
    return [...this.items];
  }

  addFromForm(item: Item): void {
    const newItem: InventoryItemView = {
      name: item.name.trim(),
      category: this.mapCategory(item.category),
      quantity: item.quantity,
      price: item.price,
      supplier: item.supplier.trim(),
      status: this.mapStatus(item.status),
      featured: item.featured >= 70,
      icon: this.mapIcon(item.category)
    };
    this.items = [newItem, ...this.items];
    this.saveItems();
  }

  updateByName(name: string, quantity: number): boolean {
    const targetName = name.trim().toLowerCase();
    const index = this.items.findIndex((item) => item.name.trim().toLowerCase() === targetName);
    if (index < 0) {
      return false;
    }

    const current = this.items[index];
    const updated = { ...current, quantity, status: this.deriveStatus(quantity) };
    this.items = [
      ...this.items.slice(0, index),
      updated,
      ...this.items.slice(index + 1)
    ];
    this.saveItems();
    return true;
  }

  removeByName(name: string): boolean {
    const targetName = name.trim().toLowerCase();
    const nextItems = this.items.filter((item) => item.name.trim().toLowerCase() !== targetName);
    if (nextItems.length === this.items.length) {
      return false;
    }
    this.items = nextItems;
    this.saveItems();
    return true;
  }

  private deriveStatus(quantity: number): InventoryStatus {
    if (quantity <= 0) {
      return 'Out of Stock';
    }
    if (quantity <= 10) {
      return 'Low Stock';
    }
    return 'In Stock';
  }

  private mapCategory(category: Category): string {
    const map: Record<Category, string> = {
      [Category.Electronics]: 'Electronics',
      [Category.Furniture]: 'Furniture',
      [Category.Clothing]: 'Clothing',
      [Category.Tools]: 'Tools',
      [Category.Misc]: 'Misc'
    };
    return map[category];
  }

  private mapStatus(status: Status): InventoryStatus {
    const map: Record<Status, InventoryStatus> = {
      [Status.InStock]: 'In Stock',
      [Status.LowStock]: 'Low Stock',
      [Status.OutOfStock]: 'Out of Stock'
    };
    return map[status];
  }

  private mapIcon(category: Category): string {
    const map: Record<Category, string> = {
      [Category.Electronics]: 'phone-portrait-outline',
      [Category.Furniture]: 'fitness-outline',
      [Category.Clothing]: 'shirt-outline',
      [Category.Tools]: 'construct-outline',
      [Category.Misc]: 'cube-outline'
    };
    return map[category];
  }

  private loadItems(): InventoryItemView[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [...this.defaultItems];
    }

    try {
      const parsed = JSON.parse(stored) as InventoryItemView[];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...this.defaultItems];
    } catch {
      return [...this.defaultItems];
    }
  }

  private saveItems(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}
