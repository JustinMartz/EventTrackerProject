import { Setup } from "./setup";
import { Tuning } from "./tuning";

export class Guitar {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  scaleLength: number;
  numberOfFrets: number;
  hasCase: boolean;
  imageUrl: string;
  bridge: string;
  tuning: Tuning;
  setups: Setup[] = [];

  constructor(
    id: number = 0,
    make: string = '',
    model: string = '',
    year: number = 0,
    color: string = '',
    scaleLength: number = 0,
    numberOfFrets: number = 0,
    hasCase: boolean = false,
    imageUrl: string = '',
    bridge: string = '',
    tuning: Tuning = new Tuning(),

  ) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.scaleLength = scaleLength;
    this.numberOfFrets = numberOfFrets;
    this.hasCase = hasCase;
    this.imageUrl = imageUrl;
    this.bridge = bridge;
    this.tuning = tuning;
  }
}
