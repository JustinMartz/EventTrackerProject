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

  constructor(private setupService: SetupService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.setupService.index().subscribe({
      next: (results) => {
        this.setups = results;
        console.log(this.setups);
      },
      error: (failure) => {
        console.error('SetupDetailComponent.reload(): error getting Setup list');
        console.error(failure);
      }
    })
  }
}
