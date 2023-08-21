import { Component, OnInit } from '@angular/core';
import { Setup } from 'src/app/models/setup';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-setup-detail',
  templateUrl: './setup-detail.component.html',
  styleUrls: ['./setup-detail.component.css']
})
export class SetupDetailComponent implements OnInit {

  setups: Setup[] = [];
  currentStyles: Record<string, string> = {};

  constructor(private setupService: SetupService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.setupService.index().subscribe({
      next: (results) => {
        this.setups = results;
        for (let s of this.setups) {
          s.isVisible = false;
        }
        console.log(this.setups);
      },
      error: (failure) => {
        console.error('SetupDetailComponent.reload(): error getting Setup list');
        console.error(failure);
      }
    })
  }

  toggleAccordion(s: Setup) {
    if (s.isVisible) {
      s.isVisible = false;
    } else {
      s.isVisible = true;
      this.setCurrentStyles();
    }
  }

  checkVisible(s: Setup) {
    if (s.isVisible) {
      return 'active setup-title';
    } else {
      return 'setup-title';
    }
  }

  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      // 'font-style':  this.canSave      ? 'italic' : 'normal',
      // 'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
      'max-height': '300px'
    };
  }
}
