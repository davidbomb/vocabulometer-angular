import { Component, OnInit, Directive, ViewChild, AfterViewInit } from '@angular/core';
import { WordsComponent } from '../words/words.component.ts'
import { WordService } from '../word.service'

@Component({
  selector: 'app-def-quizz',
  templateUrl: './def-quizz.component.html',
  styleUrls: ['./def-quizz.component.css'],
  providers: [WordService]
})

export class DefQuizzComponent implements OnInit {

  private user_id: number;
  private user_lv: number;
  private word_id: number;
  private learningArray: String[] = [];          // contains the words to learn
  private learningArrayLength:number = 10;       // defines the number of words in a quizz
  private learningArrayFeedback: String[] = [];
  private word: string;
  private synArray: String[] = [];               // will contain th synonym plus 3 random words
  private rightAnswer: string;
  private userAnswer: string;
  private word1: string;
  private word2: string;
  private word3: string;
  private def1: string;
  private def2: string;
  private def3: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;                   // used in the html to dispay/hide tags
  private quizzFinish: boolean;                  // used in the html to dispay/hide tags

  user_id = '222';
  user_lv = 1;
  word = '';
  rightAnswer = 'zzz'  //to avoid a bug (rightAnswer = userAnswer) when pressing Start Quizz
  quizzStart = false;
  quizzFinish = false;
  index = 0;
  score = 0;


  @ViewChild(WordsComponent) words: WordsComponent;


  constructor(private wordService: WordService) {  }

  nextQuizz(){
    if(!this.quizzStart) this.quizzStart = true;
    if(this.index <= this.learningArrayLength){
      this.index++
      this.def1 = this.getDefinition(this.words.getLearningArray()[0])
      this.getDefinition(this.words.getLearningArray()[1])
      this.getDefinition(this.words.getLearningArray()[2])


  }
}

getDefinition(word){

    this.wordService.getDefinition(word)
    .then(
      data => {
        console.log(data)
        return(data)
      }
      err => { console.log(err) };

   );

}





  ngOnInit() {
  }

}
