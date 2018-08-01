import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WORDS } from '../word-list';
import { QUIZZ } from '../word-list';
import { QUIZZ2 } from '../word-list';
import { shuffleArray } from '../word-list';
import { WordService } from '../word.service'
//import { learningArray, learningArrayFetch } from '../word.service'


@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
  providers: [WordService]
})
export class WordsComponent implements OnInit {

  private hide: boolean = false;
  private srsSize: number;
  private learningArray: String[] = [];
  private tradLearningArray: String[] = [];
  private user_id: number;
  private word_id: number;
  private current_word: string;
  private vocalUrl: string;


  constructor(private wordService: WordService) {  }


  getLearningArray(){
    return this.learningArray;
  }

  getTradLearningArray(){
    return this.tradLearningArray
  }

  hideList(boolean: this.hide): boolean {
    if(this.hide === true){
      this.hide = false;
      return false;
    }
    else {
      this.hide = true;
      return true;
    }
  },

  checkHide(boolean: this.hide): boolean { //Check the status of hide to hide/show the List
    if(this.hide === true){
      return false;
    }
    else {
      return true;
    }
  }
  onNameKeyUp(event:any){
    this.user_id = event.target.value;
  }
  onWordKeyUp(event:any){
    this.current_word = event.target.value;
  }

  getWordsToLearn(){
    console.log("function word component")
    this.wordService.getWordsToLearn(this.user_id)
    .then(
        data => {
          console.log("heyyyy");
          this.learningArray = data
          console.log(this.learningArray)
          this.wordService.translateWord(data.toString())
          .then(
            result => {
              this.tradLearningArray = result.split(", ")  //shaping the trad learning array
              for(var i = 0; i < this.tradLearningArray.length; i++){
                this.learningArray.push(this.tradLearningArray[i])   //concatenantion of the learning array and its traduction
              }
              console.log(this.learningArray.length)
            }
          )
        }
        err => console.log(err);
        console.log("exit get")
     );
  }



  getSrsSize(){
    console.log(this.user_id)
    this.wordService.getSrsSize(this.user_id)
    .then(
        data => {
          console.log("heyyyy");
          console.log(data)
          this.srsSize = data
        }
        err => { console.log(err) };

     );
  }

  findWordIdAndRead(){
    this.wordService.findWordIdByUserId(this.user_id, this.current_word)
    .then(
        data => {
          console.log("heyyyy");
          console.log(data)
          this.word_id = data;
          this.wordService.readWord(data)
        }
        err => { console.log(err) };
     );
  },

  findWordIdAndSucceedTest(){
    this.wordService.findWordIdByUserId(this.user_id, this.current_word)
    .then(
        data => {
          console.log("heyyyy");
          console.log(data)
          this.word_id = data
          this.wordService.succeedTest(data)
        }
        err => { console.log(err) };
     );
  },

  findWordIdAndFailTest(){
    this.wordService.findWordIdByUserId(this.user_id, this.current_word)
    .then(
        data => {
          console.log("heyyyy");
          console.log(data)
          this.word_id = data
          this.wordService.failTest(data)
        }
        err => { console.log(err) };
     );
  },


  readWord(){
    console.log(this.word_id)
    this.wordService.readWord(this.word_id)
  }



  translateWord(){
    this.wordService.translateWord(this.current_word)
  },

  succeedTest(){
    this.wordService.succeedTest(this.word_id)
  },

  fetchVocalUrl(word){
    this.wordService.fetchVocalUrl(word)
    .then( data => {
      this.vocalUrl = data;
      this.createAudioTag()
    })
  },

  createAudioTag(){
    let div = document.querySelector(".audioDiv")
    while(div.hasChildNodes()){            // reset the audio tag for a new vocal
      div.removeChild(div.childNodes[0]);
    }
    let audio = document.createElement("audio")
    let source = document.createElement("source");
    let text = document.createTextNode("Your browser does not support the audio tag");
    source.setAttribute("type", "audio/mpeg");
    source.setAttribute("src", this.vocalUrl);  // Will automatically play the fetched URL
    audio.setAttribute("controls", "")
    audio.setAttribute("id", "audio")
    audio.setAttribute("style", "display:none")  // To hide the audio player
    audio.appendChild(source);
    audio.appendChild(text);
    div.appendChild(audio)
    console.log(div.childNodes)
  },

  getSynonym(word){
    this.wordService.getSynonym(word)
    .then( data => {
      console.log(data)
    })
  }






  ngOnInit() {

    }


}
