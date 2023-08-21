import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Guitar } from 'src/app/models/guitar';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-create-guitar',
  templateUrl: './create-guitar.component.html',
  styleUrls: ['./create-guitar.component.css']
})
export class CreateGuitarComponent implements OnInit {

  @Output() cancelClicked: EventEmitter<void> = new EventEmitter();

  g: Guitar = new Guitar();

  constructor(private guitarService: GuitarService) {}

  ngOnInit(): void {
    let ultimateGuitarContainer: HTMLElement | null = document.getElementById('guitars-container');

    ultimateGuitarContainer!.scrollTo({
      top: ultimateGuitarContainer!.scrollHeight,
       behavior: 'smooth'
    });
  }

  onCreate(g: Guitar) {
    console.log(g);
    this.guitarService.create(g).subscribe({
      next: (result) => {
      window.location.reload();
      },
      error: (nojoy) => {
        console.error('CreateGuitarComponent.onCreate(): error creating Guitar:');
        console.error(nojoy);
      }
    });
  }

  onCancel() {
    // document.getElementById('guitars-container')!.lastElementChild!.remove();
    this.cancelClicked.emit();
  }
}
