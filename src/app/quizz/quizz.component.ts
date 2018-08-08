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
  private learningArray: String[] = [];         // contains the words to learn
  private learningArrayLength:number = 10;      // defines the number of words in a quizz
  private learningArrayFeedback: String = [];   // contains the words where the user failed the quizz
  private indexFailList: number[] = [];         // retrieve the indexes of the failed words to fill learningArrayFeedback
  private lg_src: string;
  private lg_dst: string;
  private word: string;
  private answer: string;
  private translation: string;
  private wrong_translation: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;                   // used in the html to dispay/hide tags
  private quizzFinish: boolean;                  // used in the html to dispay/hide tags

  // Initializin variables
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
    if(!this.quizzStart) this.quizzStart = true;  // Quizz hasn't started yet
    if(this.index <= this.learningArrayLength){
      this.words.user_id = this.user_id;
      this.words.current_word = this.word;
      this.checkAnswer();
      if(this.index < this.learningArrayLength){ // to avoid messing up on the last "next quizz" pressure
        this.word = this.words.getLearningArray()[this.index];
        this.translation = this.words.getLearningArray()[this.index + this.learningArrayLength]
        this.words.fetchVocalUrl(this.word);       // to get the vocal synthesis of the current word
      }
      console.log(this.word  + ' : ' + this.translation)
      this.index++;
    }

    else {
      this.fillLearningArrayFeedback();
      this.word = 'End of Quizz'
      this.quizzFinish = true;
    }
  }



  fillLearningArrayFeedback(){
    this.indexFailList.pop()        // one extra index is pushed in the loop and must be removed
    for(let i = 0; i < this.indexFailList.length; i++) {  // fills the words failed
      this.learningArrayFeedback.push(this.words.getLearningArray()[this.indexFailList[i]])
    }
    for(let i = 0; i < this.indexFailList.length; i++) {  // fills the translation of the words failed
      this.learningArrayFeedback.push(this.words.getLearningArray()[this.indexFailList[i] + this.learningArrayLength])
    }
  }

  checkAnswer(){
    if(this.answer === this.translation) {  // the user responds correctly : he read the word and passes the testSuccess
      this.score++;
      this.words.findWordIdAndRead()
      this.words.findWordIdAndSucceedTest()
    }
    else {   // the user responds wrong: he passes testFail
      this.words.findWordIdAndFailTest();
      this.indexFailList.push(this.index);   // retrieving the index of failed word to show it again during feedback
    }
  }





  ngOnInit() {

    this.learningArray = this.words.getLearningArray()
    console.log(this.learningArray)


  }

}
