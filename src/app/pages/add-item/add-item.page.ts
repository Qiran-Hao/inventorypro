import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Item, Category, Status } from '../../models/item.model';
import { InventoryStateService } from '../../services/inventory-state.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddItemPage {
  private readonly baseRecommended = [
    { name: 'MacBook Air M2', price: 8999, stock: 20, icon: 'laptop-outline' },
    { name: 'Mechanical Keyboard K2', price: 499, stock: 15, icon: 'grid-outline' },
    { name: 'Sony Mirrorless Camera', price: 6599, stock: 30, icon: 'camera-outline' }
  ];

  item: Item = this.createEmptyItem();

  categories = [
    { label: 'Electronics', value: Category.Electronics },
    { label: 'Furniture', value: Category.Furniture },
    { label: 'Clothing', value: Category.Clothing },
    { label: 'Tools', value: Category.Tools },
    { label: 'Misc', value: Category.Misc }
  ];

  statuses = [
    { label: 'In Stock', value: Status.InStock },
    { label: 'Low Stock', value: Status.LowStock },
    { label: 'Out of Stock', value: Status.OutOfStock }
  ];

  recommended = [...this.baseRecommended];

  constructor(
    private inventoryState: InventoryStateService,
    private router: Router
  ) {}

  addItem(): void {
    if (!this.item.name || this.item.quantity <= 0 || this.item.price <= 0 || !this.item.supplier) {
      alert('Please complete all required fields. Quantity and price must be greater than 0.');
      return;
    }

    this.inventoryState.addFromForm(this.item);
    alert(`Item added: ${this.item.name}`);
    this.item = this.createEmptyItem();
    void this.router.navigateByUrl('/inventory-list', { replaceUrl: true });
  }

  showHelp(): void {
    alert('Fill in name, category, quantity, price, and supplier, then submit.');
  }

  refreshRecommendations(): void {
    const shuffled = [...this.baseRecommended];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    this.recommended = shuffled;
  }

  private createEmptyItem(): Item {
    return {
      name: '',
      category: Category.Electronics,
      quantity: 0,
      price: 0,
      supplier: '',
      status: Status.InStock,
      featured: 50,
      notes: ''
    };
  }
}
