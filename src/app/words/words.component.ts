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
  wordList = WORDS;
  quizzList = shuffleArray(QUIZZ);
  quizz2List = shuffleArray(QUIZZ2);
  srsSize: number;
  learningArray: String[] = [];
  user_id: number;

  selectedWord: Word;
  hide: boolean = false;

  constructor(private wordService: WordService) { }

  checkAnswer(word: Word): boolean {
    this.selectedWord = word;
    var ID = this.selectedWord.id;
    if (this.selectedWord.trad === this.wordList[ID].trad && this.selectedWord.voc === this.wordList[ID].voc){
      //console.log("true");
      return true;
    }
    else{
      //console.log("false");
      return false;
    }
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
  }

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

  getWordsToLearn(){
    console.log("function word component")
    this.wordService.getWordsToLearn(this.user_id)
    .then(
        data => {
          console.log("heyyyy");
          this.learningArray = data
          console.log(this.learningArray)
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
        err => console.log(err);
        console.log("exittt get")
     );
  }



  ngOnInit() {

    }


}
