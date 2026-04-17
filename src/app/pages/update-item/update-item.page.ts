import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryStateService } from '../../services/inventory-state.service';

interface UpdateLog {
  name: string;
  quantity: number;
  time: string;
}

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdateItemPage {
  itemName = 'iPhone 17 Pro';
  quantity = 120;
  logs: UpdateLog[] = [];

  constructor(private inventoryState: InventoryStateService) {}

  updateItem(): void {
    if (!this.itemName.trim() || this.quantity < 0) {
      alert('Please enter a valid item name and a non-negative quantity.');
      return;
    }

    const updated = this.inventoryState.updateByName(this.itemName, this.quantity);
    if (!updated) {
      alert('Item not found. Please check the item name in Inventory page.');
      return;
    }

    this.logs = [
      {
        name: this.itemName,
        quantity: this.quantity,
        time: new Date().toLocaleString()
      },
      ...this.logs
    ].slice(0, 5);

    alert(`Inventory updated: ${this.itemName} -> ${this.quantity}`);
  }

  autofillExample(name: string, quantity: number): void {
    this.itemName = name;
    this.quantity = quantity;
  }

  showHelp(): void {
    alert('Update quantity by item name. The item must exist in Inventory.');
  }
}
