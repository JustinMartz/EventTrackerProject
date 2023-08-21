import { Guitar } from "./guitar";
import { Tuning } from "./tuning";

export class Setup {
  id: number;
  stringGauge: string;
  stringBrand: string;
  dateOfSetup: Date;
  actionTreble: number;
  actionBass: number;
  notes: string;
  guitar: Guitar;
  tuning: Tuning;
  isVisible: boolean;

  constructor(
    id: number = 0,
    stringGauge: string = '',
    stringBrand: string = '',
    dateOfSetup: Date = new Date(),
    actionTreble: number = 0,
    actionBass: number = 0,
    notes: string = '',
    guitar: Guitar = new Guitar(),
    tuning: Tuning = new Tuning(),
    isVisible: boolean = false
  ) {
    this.id = id;
    this.stringGauge = stringGauge;
    this.stringBrand = stringBrand;
    this.dateOfSetup = dateOfSetup;
    this.actionTreble = actionTreble;
    this.actionBass = actionBass;
    this.notes = notes;
    this.guitar = guitar;
    this.tuning = tuning;
    this.isVisible = isVisible;
  }
}
