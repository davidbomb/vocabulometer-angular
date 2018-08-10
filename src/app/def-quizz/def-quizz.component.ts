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
  private learningArrayTmp: String[] = [];
  private word: string;
  private defArray: object = {};               // will contain th synonym plus 3 random words
  private userAnswerVoc: string;
  private userAnswerDef: string;
  private score: number;
  private current_score: number;
  private index: number;
  private quizzStart: boolean;                   // used in the html to dispay/hide tags
  private quizzFinish: boolean;                  // used in the html to dispay/hide tags
  private wordList: string[] = [];
  private defList: string[] = [];


  user_id = '222';
  user_lv = 1;
  word = '';
  quizzStart = false;
  quizzFinish = false;
  index = 0;
  score = 0;
  current_score = 0;




  @ViewChild(WordsComponent) words: WordsComponent;


  constructor(private wordService: WordService) {  }



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
    if(this.current_score < 1 ){
      this.index++;
      this.current_score++;
      this.learningArray = this.words.getLearningArray()
      for(let i = 0; i < this.learningArrayLength/2; i++){
        this.wordList.push(this.learningArray[i]);
      }
      this.fillDefQuizz(this.wordList)
    }

    if(this.score >= 5 ){
      this.index++;
      this.current_score++;
      for(let i = this.learningArrayLength/2; i < this.learningArrayLength; i++){
        this.wordList.push(this.learningArray[i]);
      }
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
        this.shuffleArray(this.defList)
      }
      err => { console.log(err) };
   )
 }
}

findAndRemove(text, list){ // remove from list when there is a good answer
  for(let i = 0; i < list.length; i++){
    if(list[i] === text){
      list.splice(i,1);
    }
  }
}


shuffleArray(array) {  // used to mix the answers of the quizz
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}








  ngOnInit() {
  }

}
