import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrivacyPage {
  readonly principles = [
    'We keep inventory data on your device only.',
    'We do not collect personal identity information.',
    'No third-party analytics or ad SDKs are enabled.',
    'You can clear app data at any time.'
  ];

  readonly checklist = [
    'Use a screen lock on your device.',
    'Avoid sharing sensitive supplier details.',
    'Back up records before reinstalling the app.',
    'Review inventory permissions regularly.'
  ];

  showHelp(): void {
    alert('This page explains app privacy and basic security practices.');
  }
}
