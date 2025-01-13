import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyimage',
  templateUrl: './lazy-image.component.html',
})
export class LazyimageComponent implements OnInit  {
@Input()
public url!: string;

@Input()
public alt: string = '';

public hasloarded: boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required.');
  }

  onLoad(){
    this.hasloarded = true;
  }
}
