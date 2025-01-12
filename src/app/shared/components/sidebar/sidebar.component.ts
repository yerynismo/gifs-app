import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private _gifsService: GifsService){}

 get tags(): string[]{

  let x = this._gifsService.tagsHistory;
  //console.log(x);
    return x
  }

clickNewTagButton(newTag: string) {
  this._gifsService.searchTag(newTag)
}
}
