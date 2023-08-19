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

  selected: Guitar | null = null;
  updated: boolean = false;

  constructor(private guitarService: GuitarService) {}

  onUpdate() {
    this.updateClicked.emit();
    this.selected = this.g;
    this.updated = true;
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
}
