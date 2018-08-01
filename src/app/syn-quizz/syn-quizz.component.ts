import { Component, OnInit, Directive, ViewChild, AfterViewInit } from '@angular/core';
import { learningArray } from '../words/words.component.ts'
import { WordsComponent } from '../words/words.component.ts'
import { WordService } from '../word.service'


@Component({
  selector: 'app-syn-quizz',
  templateUrl: './syn-quizz.component.html',
  styleUrls: ['./syn-quizz.component.css']
})
export class SynQuizzComponent implements OnInit {

  private user_id: number;
  private word_id: number;
  private learningArray: String[] = [];
  private lg_src: string;
  private word: string;
  private synonym: string;
  private answer1: string;
  private answer2: string;
  private answer3: string;
  private answer4: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;
  private learningArrayLength:number = 10;

  user_id = '222';
  word = 'test';
  answer1 = "puuute";
  answer2 = "bite";
  answer3 = "couillemolle";
  answer4 = "ouiii";
  translation = '';
  quizzStart = false;
  lg_src = 'English';
  index = 0;
  score = 0;







  @ViewChild(WordsComponent) words: WordsComponent;

  constructor() { }


  nextQuizz(){  // refresh the quizz after each answer
    if(!this.quizzStart) this.quizzStart = true;
    if(this.index < this.learningArrayLength){
      this.words.user_id = this.user_id;
      this.words.current_word = this.word;
      this.synonym = this.words.getSynonym(this.word);
      console.log("word: " + this.word)
      console.log("syn: " + this.synonym)
      this.answer1 = this.words.getSynonym(this.word);
      this.words.fetchVocalUrl(this.word);
      this.word = this.words.getLearningArray()[this.index];
      this.index++;
    }

      /*this.words.user_id = this.user_id;
      this.words.current_word = this.word;

      if(this.answer === this.translation) {  // the user responds correctly : he read the word and passes the testSuccess
        this.score++;
        this.words.findWordIdAndRead()
        this.words.findWordIdAndSucceedTest()
      }
      else { this.words.findWordIdAndFailTest() } // the user responds wrong: he passes testFail

      this.word = this.words.getLearningArray()[this.index];
      this.translation = this.words.getLearningArray()[this.index + this.learningArrayLength]
      this.words.fetchVocalUrl(this.word);       // to get the vocal synthesis of the current word

      console.log(this.word  + ' : ' + this.translation)

      this.index++;


    }*/
    else {
      if(this.index <= this.learningArrayLength) this.index++;
      this.word = 'End of Quizz'
      this.translation = 'Congratulation !'
    }

  }

  ngOnInit() {
    this.learningArray = this.words.getLearningArray()
  }

}
