import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { Setup } from 'src/app/models/setup';
import { GuitarService } from 'src/app/services/guitar.service';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-guitar-detail',
  templateUrl: './guitar-detail.component.html',
  styleUrls: ['./guitar-detail.component.css']
})
export class GuitarDetailComponent implements OnInit {
  @Input() g: Guitar = new Guitar();

  @Output() updateClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter();

  selected: Guitar | null = null;
  updatedGuitarExists: boolean = false;
  currentSetup: Setup = new Setup();

  constructor(private guitarService: GuitarService, private setupService: SetupService) {}

  ngOnInit(): void {
    this.getCurrentSetup(this.g.id);
  }

  onUpdate() {
    this.selected = this.g;
    this.updatedGuitarExists = true;
    this.updateClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }

  onSave() {
    this.guitarService.update(this.g).subscribe( {
      next: (result: Guitar) => {
        this.selected = result;
        window.location.reload();
      },
      error: (nojoy) => {
        console.error('GuitarDetailComponent.onSave(): error updating Guitar:');
        console.error(nojoy);
      },
    });
  }

  cancelUpdate() {
    console.log('in cancelUpdate()' + this.selected);
    this.updatedGuitarExists = false;
    this.cancelClicked.emit();
  }

  getCurrentSetup(id: number) {
    this.setupService.getCurrentByGuitarId(id).subscribe( {
      next: (result: Setup) => {
        this.currentSetup = result;
      },
      error: (nojoy) => {
        console.error('GuitarDetailComponent.getCurrentSetup(): error getting Setup:');
        console.error(nojoy);
      },
    });
  }
}
