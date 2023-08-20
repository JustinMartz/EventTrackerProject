import { Component, OnInit } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { Setup } from 'src/app/models/setup';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  guitarList: Guitar[] = [];
  color: string = '';
  selected: Guitar | null = null;
  newGuitar: Guitar = new Guitar();
  existingGuitar: Guitar | null = null;
  creatingNewGuitar: boolean = false;

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
        console.log(this.guitarList);
      },
      error: (failure) => {
        console.error('HomeComponent.reload(): error getting Guitar list');
        console.error(failure);
      }
    })
  }

  allGuitars() {
    this.reload();
    let ultimateGuitarContainer: HTMLElement | null = document.getElementById('guitars-container');
    ultimateGuitarContainer!.scrollTop = 0;

    // ultimateGuitarContainer!.scrollTo({
    //   top: ultimateGuitarContainer!.scrollHeight,
    //    behavior: 'smooth'
    // });
  }

  findByTuning(tuningId: number) {
    this.guitarService.findByTuning(tuningId).subscribe({
      next: (results) => {
        console.log('findByTuning(): ' + results)
        this.guitarList = results;
        console.log(this.guitarList);
      },
      error: (failure) => {
        console.error('HomeComponent.findByTuning(): error getting Guitar list');
        console.error(failure);
      }
    });
  }

  findByBridge(bridge: string) {
    switch (bridge) {
      case 'Tune-O-Matic':
        break;
      case '3-Saddle':
        break;
      case 'Floyd Rose':
        bridge = 'Floyd%20Rose';
        break;
        default:
          alert('Invalid bridge type: ' + bridge)
          return;
    }

    this.guitarService.findByBridge(bridge).subscribe({
      next: (results) => {
        console.log('findByBridge(): ' + results)
        this.guitarList = results;
        console.log(this.guitarList);
      },
      error: (failure) => {
        console.error('HomeComponent.findByBridge(): error getting Guitar list');
        console.error(failure);
      }
    });
  }

  onColorSubmit(color: string) {
    if (!color) {
      alert('Search must not be empty.' + color);
      return;
    }

    this.guitarService.searchByColor(encodeURI(color)).subscribe({
      next: (results) => {
        console.log('searchByColor(): ' + results)
        this.guitarList = results;
        console.log(this.guitarList);
      },
      error: (failure) => {
        console.error('HomeComponent.searchByColor(): error getting Guitar list');
        console.error(failure);
      }
    });
  }

  delete(guitar: Guitar) {
    let result = confirm('Are you sure you want to delete this guitar? This guitar and all associated setups will be deleted forever.');
    if (result) {
      this.guitarService.delete(guitar.id).subscribe({
        next: (result) => {
          this.reload();
        },
        error: (nojoy) => {
          console.error('GuitarComponent.delete(): error deleting Guitar:');
          console.error(nojoy);
        },
      });
    }
    console.log(result);
  }

  editGuitar(guitar: Guitar) {
    this.selected = guitar;
  }

  addNewGuitar() {
    this.creatingNewGuitar = true;
  }

}
