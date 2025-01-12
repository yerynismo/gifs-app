import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
@ViewChild('txtTagImput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private _giftservice: GifsService){}
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this._giftservice.searchTag(newTag)
    this.tagInput.nativeElement.value = '';
  }

}
