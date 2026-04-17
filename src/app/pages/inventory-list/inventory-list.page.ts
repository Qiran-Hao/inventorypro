import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryItemView, InventoryStateService } from '../../services/inventory-state.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.page.html',
  styleUrls: ['./inventory-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryListPage {
  keyword = '';
  selectedCategory = 'All';
  selectedStatus = 'All';
  items: InventoryItemView[] = [];

  readonly categories = ['All', 'Electronics', 'Furniture', 'Clothing', 'Tools', 'Misc'];
  readonly statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  constructor(
    private inventoryState: InventoryStateService,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.refreshItems();
  }

  refreshItems(): void {
    this.items = this.inventoryState.getItems();
  }

  goToAddItem(): void {
    void this.router.navigateByUrl('/add-item');
  }

  removeItem(name: string): void {
    const shouldDelete = confirm(`Delete "${name}" from inventory?`);
    if (!shouldDelete) {
      return;
    }

    const removed = this.inventoryState.removeByName(name);
    if (!removed) {
      alert('Item not found.');
      return;
    }

    this.refreshItems();
  }

  get filteredItems(): InventoryItemView[] {
    return this.items.filter((item) => {
      const categoryMatch = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const statusMatch = this.selectedStatus === 'All' || item.status === this.selectedStatus;
      const keywordMatch = this.keyword.trim().length === 0
        || item.name.toLowerCase().includes(this.keyword.toLowerCase())
        || item.supplier.toLowerCase().includes(this.keyword.toLowerCase());
      return categoryMatch && statusMatch && keywordMatch;
    });
  }

  get totalCount(): number {
    return this.filteredItems.length;
  }

  get inStockCount(): number {
    return this.filteredItems.filter((item) => item.status === 'In Stock').length;
  }

  get lowStockCount(): number {
    return this.filteredItems.filter((item) => item.status === 'Low Stock').length;
  }

  getStatusClass(status: InventoryItemView['status']): string {
    if (status === 'In Stock') {
      return 'status-in-stock';
    }
    if (status === 'Low Stock') {
      return 'status-low-stock';
    }
    return 'status-out-stock';
  }

  showHelp(): void {
    alert('Use this page to search, filter, and review inventory records.');
  }
}
