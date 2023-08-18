import { Component, OnInit } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  guitarList: Guitar[] = []

  constructor(
    private guitarService: GuitarService
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.guitarService.index().subscribe({
      next: (results) => {
        this.guitarList = results;
      },
      error: (failure) => {
        console.error('HomeComponent.reload(): error getting Guitar list');
        console.error(failure);
      }
    })
  }
}
