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
  private learningArray: String[] = [];
  private learningArrayFetch: boolean = false;
  private learningArrayLength: number = 10;

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
                  if(this.learningArray.length > this.learningArrayLength) break;
                }
              }
              resolve(this.learningArray.slice(0,this.learningArrayLength));
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

    findWordIdByUserId(user_id, word){
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/findwordidbyuserid/' + user_id + '/' + word)
        .subscribe(
          (data:[any]) => {
            if(data !== null){

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


    readWord(word_id){
      return new Promise((resolve, reject) => {
        this.http.post('http://localhost:3000/readword/' + word_id )
        .subscribe(
          (data:[any]) => {
              console.log("word read")
              resolve(data);
            }
        )
      });
    }


      translateWord(word){
        return new Promise((resolve, reject) => {
          console.log('translating...')
          this.http.get('http://localhost:3000/translate/' + word + '?src=en'+'&dst=fr')
          .subscribe(
            (data:[any]) => {
                resolve(data);
              }
          )
        })
      }

      succeedTest(word_id){
        this.http.post('http://localhost:3000/test/succeed/' + word_id )
        .subscribe(
          (data:[any]) => {
              console.log("test succeeded");
            }
        )
      }

      failTest(word_id){
        this.http.post('http://localhost:3000/test/fail/' + word_id )
        .subscribe(
          (data:[any]) => {
              console.log("test failed");
            }
        )
      }

}
