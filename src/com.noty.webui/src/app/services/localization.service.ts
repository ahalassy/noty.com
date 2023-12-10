import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private entryTypeCaptions: { [key: string]: string } = {};

  constructor() {
    this.entryTypeCaptions[NotyEntryType.checkItem] = 'Check';
    this.entryTypeCaptions[NotyEntryType.text] = 'Note';
  }

  public translateEntryType(type: NotyEntryType | string): string {
    return type in this.entryTypeCaptions
      ? this.entryTypeCaptions[type]
      : '<<unknown>>';

  }
}
