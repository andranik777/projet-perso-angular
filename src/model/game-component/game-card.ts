export class GameCard {

  private _name :string;
  private _platform :string;

  constructor(name:string,platform:string) {

    this._name = name;
    this._platform = platform;

  }

  get platform(): string {
    return this._platform;
  }
  get name(): string {
    return this._name;
  }
}
