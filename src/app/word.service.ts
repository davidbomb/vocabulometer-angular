import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { wordsComponent } from './words/words.component'
import { learningArray } from './words/words.component'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class WordService {

  //let wordModel: { id: number, name: string }[]
  learningArray: String[] = [];
  learningArrayFetch: boolean = false;

  constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    getWordsToLearn(user_id) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/findwordstolearn/' + user_id)
        .subscribe(
          (data:[any]) => {
            if(data.length){
              this.learningArray = []   //reset the learning array
              for (var i = 0; i < data.length; i++) {
                for ( var j = 0; j < data[i].length; j++) {
                  this.learningArray.push(data[i][j].word)
                }
              }
              this.learningArrayFetch = true;
              //console.log(this.learningArray
              resolve(this.learningArray);
            }
              if(!data.length) {
              console.log("No more words to learn");
              resolve()
            }
          }
        )

      });
    }



    getSrsSize(user_id) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/srs/getsize/' + user_id)
        .subscribe(
          (data:[any]) => {
            if(data !== null){
              console.log("data exists")
              console.log(data)
              resolve(data);
            }
              if(data === null) {  // remplacer : erreur a gerer
              console.log("User not found");
              reject();
            }
          }
        )
      });
    }


}
