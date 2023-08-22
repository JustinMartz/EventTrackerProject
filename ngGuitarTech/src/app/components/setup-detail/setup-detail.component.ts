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
  selected: Setup | null = null;
  existingSetup: Setup | null = null;
  updatedSetupExists: boolean = false;

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

  onDelete(id: number) {
    let result = confirm('Are you sure you want to delete this setup? This setup will be deleted forever.');
    if (result) {
      this.setupService.delete(id).subscribe({
        next: (result) => {
          this.reload();
        },
        error: (nojoy) => {
          console.error('SetupComponent.delete(): error deleting Setup:');
          console.error(nojoy);
        },
      });
    }
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

  editSetup(setup: Setup) {
    this.selected = setup;
    this.updatedSetupExists = true;
  }

  cancelEdit() {
    this.selected = null;
    this.updatedSetupExists = false;
    console.log('in cancelEdit(): ' + this.updatedSetupExists);
    // this.reload();
  }
}
