import { Component, OnInit, Directive, ViewChild, AfterViewInit } from '@angular/core';
import { learningArray } from '../words/words.component.ts'
import { WordsComponent } from '../words/words.component.ts'
import { WordService } from '../word.service'



@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  private user_id: number;
  private word_id: number;
  private learningArray: String[] = [];
  private learningArrayFeedback: String = [];
  private indexFailList: number[] = [];
  private lg_src: string;
  private lg_dst: string;
  private word: string;
  private answer: string;
  private translation: string;
  private wrong_translation: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;
  private quizzFinish: boolean;
  private learningArrayLength:number = 10;

  // Initialisation of the Quizz
  user_id = '222';
  word = '';
  translation = '';
  quizzStart = false;
  quizzFinish = false;
  lg_src = 'English';
  lg_dst = 'French';
  index = 0;
  score = 0;



  @ViewChild(WordsComponent) words: WordsComponent;


  constructor() { }

  onAnswerKeyUp(event:any){
    this.answer = event.target.value;
  }

  nextQuizz(){  // refresh the quizz after each answer
    if(!this.quizzStart) this.quizzStart = true;
    if(this.index < this.learningArrayLength){
      this.words.user_id = this.user_id;
      this.words.current_word = this.word;

      if(this.answer === this.translation) {  // the user responds correctly : he read the word and passes the testSuccess
        this.score++;
        this.words.findWordIdAndRead()
        this.words.findWordIdAndSucceedTest()
      }
      else {   // the user responds wrong: he passes testFail
        this.words.findWordIdAndFailTest();
        this.indexFailList.push(this.index);
      }

      this.word = this.words.getLearningArray()[this.index];
      this.translation = this.words.getLearningArray()[this.index + this.learningArrayLength]
      this.words.fetchVocalUrl(this.word);       // to get the vocal synthesis of the current word

      console.log(this.word  + ' : ' + this.translation)

      this.index++;


    }
    else {
      if(this.index <= this.learningArrayLength) {
        this.index++;
        if(this.answer === this.translation) {  // the user responds correctly : he read the word and passes the testSuccess
          this.score++;
          this.words.findWordIdAndRead()
          this.words.findWordIdAndSucceedTest()
        }
        else {
          this.words.findWordIdAndFailTest()
          this.indexFailList.push(this.index);
        }
        for(let i = 0; i < this.indexFailList.length; i++) {
          this.learningArrayFeedback.push(this.words.getLearningArray()[this.indexFailList[i]])
        }
        for(let i = 0; i < this.indexFailList.length; i++) {
          this.learningArrayFeedback.push(this.words.getLearningArray()[this.indexFailList[i] + this.learningArrayLength])
        }
      }
      console.log(this.learningArrayFeedback)
      this.word = 'End of Quizz'
      this.quizzFinish = true;
    }

  }





  ngOnInit() {

    this.learningArray = this.words.getLearningArray()
    console.log(this.learningArray)


  }

}
