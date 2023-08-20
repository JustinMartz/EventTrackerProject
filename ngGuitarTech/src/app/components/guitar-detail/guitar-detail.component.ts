import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-guitar-detail',
  templateUrl: './guitar-detail.component.html',
  styleUrls: ['./guitar-detail.component.css']
})
export class GuitarDetailComponent {
  @Input() g: Guitar = new Guitar();

  @Output() updateClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter();

  selected: Guitar | null = null;
  updatedGuitarExists: boolean = false;

  constructor(private guitarService: GuitarService) {}

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
        console.error('GuitarComponent.delete(): error deleting Guitar:');
        console.error(nojoy);
      },
    })
  }

  cancelUpdate() {
    console.log('in cancelUpdate()' + this.selected);
    this.updatedGuitarExists = false;
    this.cancelClicked.emit();
  }
}
