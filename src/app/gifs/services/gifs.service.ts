import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'zcQwilhit4w7ZOKr9FmzR1bQPH5qMliv';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory )); //stringify convierte objeto a un string
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }


  searchTag( tag: string ):void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
      //   console.log({ gifs: this.gifList });

      });






  }


}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GifsService {

// private _tagsHistory: string[] = [];

// //public gifList: Gif[] = [];

// private apiKey:       string = 'dGMJW12nlHSz46O3sy81BZFryoPshmUk';
// private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';
//   constructor() { }

//   get tagsHistory() {
//     return [...this._tagsHistory]; //Usar el operador spread para crear una copia del tags history
//   }

//   private organizeHistory(tag: string) {
//     tag = tag.toLowerCase();

//     if (this._tagsHistory.includes(tag)) {
//       this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag); // el filter sirve para regresar un nuevo arregle pero solo regresa los elemento cuya funcion retoene verdadeo
//     }// solo los que son diferentes al tag origianal los va dejar pasar
//     this._tagsHistory.unshift(tag); //unshift agrega un elemento al inicio del array
//     this._tagsHistory = this._tagsHistory.slice(0,10 ) // limitar el arreglo a 10 elementos
//   }
//   public searchTag( tag : string ): void {
//     if (tag.length === 0) return;
//     this.organizeHistory(tag); //llamar la función para organizar el historial
//   //  this._tagsHistory.unshift( tag ); //unshit inserta un elemeto al inicio del array


//   }

// }
