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
  private defArray: object = {};               // will contain th synonym plus 3 random words
  private rightAnswer: string;
  private userAnswerVoc: string;
  private userAnswerDef: string;
  private word1: string;
  private word2: string;
  private word3: string;
  private def1: string;
  private def2: string;
  private def3: string;
  private def4: string;
  private def5: string;
  private score: number;
  private current_score: number;
  private index: number;
  private quizzStart: boolean;                   // used in the html to dispay/hide tags
  private quizzFinish: boolean;                  // used in the html to dispay/hide tags
  private wordList: string[] = ["cat", "dog", "penis", "vagina", "whore"];
  private defList: string[] = [];
  private keys: string[];
  private values: string[];

  user_id = '222';
  user_lv = 1;
  word = '';
  rightAnswer = 'zzz'  //to avoid a bug (rightAnswer = userAnswer) when pressing Start Quizz
  quizzStart = false;
  quizzFinish = false;
  index = 0;
  score = 0;
  current_score = 0;




  @ViewChild(WordsComponent) words: WordsComponent;


  constructor(private wordService: WordService) {  }

  findAndRemove(text, list){
    for(let i = 0; i < list.length; i++){
      if(list[i] === text){
        list.splice(i,1);
      }
    }
  }

  getClickVoc(event:any) {  // to retrieve the user's vocabulary selected
    this.userAnswerVoc = event.target.textContent;
    if(this.userAnswerDef === this.defArray[this.userAnswerVoc]) {
      this.score++;
      this.index++;
      this.findAndRemove(this.userAnswerVoc, this.wordList)
      this.findAndRemove(this.userAnswerDef, this.defList)
      console.log("good answer");
    }
  }

  getClickDef(event:any) {  // to retrieve the user's definition selected
    this.userAnswerDef = event.target.textContent;
    if(this.userAnswerDef === this.defArray[this.userAnswerVoc]) {
      this.score++;
      this.index++;
      this.findAndRemove(this.userAnswerVoc, this.wordList)
      this.findAndRemove(this.userAnswerDef, this.defList)
      console.log("good answer");
    }
  }


  nextQuizz(){
    if(!this.quizzStart) this.quizzStart = true;
    if(this.index <= this.learningArrayLength){
      this.index++;
      this.fillDefQuizz(this.wordList)


  }
}

fillDefQuizz(wordList){
  for(let i = 0; i < 5; i++){
    this.wordService.getDefinition(wordList[i])
    .then(
      data => {
        this.defArray[wordList[i]] = data;  //fill the array with the keys (vocabulary) and values (definitions)
        this.defList.push(data)
      /*  if (this.defList.length === 5){
          console.log(this.defArray);
          while(this.current_score < 5){
            if(this.userAnswerDef === this.defArray[this.userAnswerVoc]) {
              //this.current_score++;
              console.log("good answer");
              this.userAnswerVoc = "0";
              this.userAnswerDef = "1";
            }
          }
          console.log("biiiiaaaatch")
        }*/

      }
      err => { console.log(err) };
   );  //.then() end

 }
 //console.log(this.defArray)
}








  ngOnInit() {
  }

}
