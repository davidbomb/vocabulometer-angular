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
  private defArray: String[] = [];               // will contain th synonym plus 3 random words
  private rightAnswer: string;
  private userAnswer: string;
  private word1: string;
  private word2: string;
  private word3: string;
  private def1: string;
  private def2: string;
  private def3: string;
  private def4: string;
  private def5: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;                   // used in the html to dispay/hide tags
  private quizzFinish: boolean;                  // used in the html to dispay/hide tags
  private wordList: string[] = ["cat", "dog", "penis", "vagina", "whore"]

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
      this.fillDefQuizz(["cat", "dog", "penis", "vagina", "whore"])


  }
}

fillDefQuizz(wordList){
  for(let i = 0; i < 5; i++){
    this.wordService.getDefinition(wordList[i])
    .then(
      data => {
        this.defArray[i] = data;
      }
      err => { console.log(err) };
   );
 }
 this.def1 = this.defArray[0];
 this.def2 = this.defArray[1];
 this.def3 = this.defArray[2];
 this.def4 = this.defArray[3];
 this.def5 = this.defArray[4];
}





  ngOnInit() {
  }

}
