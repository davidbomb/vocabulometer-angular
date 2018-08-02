import { Component, OnInit, Directive, ViewChild, AfterViewInit } from '@angular/core';
import { learningArray } from '../words/words.component.ts'
import { WordsComponent } from '../words/words.component.ts'
import { WordService } from '../word.service'


@Component({
  selector: 'app-syn-quizz',
  templateUrl: './syn-quizz.component.html',
  styleUrls: ['./syn-quizz.component.css'],
    providers: [WordService]
})
export class SynQuizzComponent implements OnInit {

  private user_id: number;
  private user_lv: number;
  private word_id: number;
  private learningArray: String[] = [];
  private lg_src: string;
  private word: string;
  private synArray: String[] = [];
  private rightAnswer: string;
  private userAnswer: string;
  private answer1: string;
  private answer2: string;
  private answer3: string;
  private answer4: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;
  private learningArrayLength:number = 10;

  user_id = '222';
  user_lv = 1;
  word = '';
  answer1 = "";
  answer2 = "";
  answer3 = "";
  answer4 = "";
  rightAnswer = 'zzz';
  translation = '';
  quizzStart = false;
  lg_src = 'English';
  index = 0;
  score = 0;







  @ViewChild(WordsComponent) words: WordsComponent;

  constructor(private wordService: WordService) { }


  shuffleArray(array) {  // used to mix the answers of the quizz
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }
  getClick(event:any) {
    console.log(event.target.textContent);
    this.userAnswer = event.target.textContent;
  }


  nextQuizz(){  // refresh the quizz after each answer
    if(!this.quizzStart) this.quizzStart = true;
    if(this.index < this.learningArrayLength){
      this.synArray = [];               // set the synArray to None to erase previous random words
      this.word = this.words.getLearningArray()[this.index];



      // fetch a synonym and mixing the answer with random words from srs
      this.wordService.getSynonym(this.word)
      .then( result => {
        this.rightAnswer = result;       // storing the right answer now to compare with the answer provided by user after
        this.wordService.getRandomWords(this.user_id)
        .then( res => {
          for(let i = 0; i < res.length; i++){
            this.synArray[i] = res[i].word;
          }
            this.synArray.push(result);
            this.shuffleArray(this.synArray);
            console.log("shuffle: " + this.synArray)

            this.answer1 = this.synArray[0]
            this.answer2 = this.synArray[1]
            this.answer3 = this.synArray[2]
            this.answer4 = this.synArray[3]
        });
      });

      this.words.fetchVocalUrl(this.word);

      this.words.user_id = this.user_id;
      this.words.current_word = this.word;

      console.log("word: " + this.word)
      console.log("syn: " + this.synonym)
      this.index++;
      if(this.userAnswer === this.rightAnswer){
        console.log("right answer !")
        this.score++;
      }
      else console.log("wrong answer !")
    }

    else {
      if(this.index <= this.learningArrayLength) {
        this.index++;
        if(this.userAnswer === this.rightAnswer){
          console.log("right answer !")
          this.score++;
        }
      }
      this.word = 'End of Quizz'
      this.translation = 'Congratulation !'
    }

  }



  ngOnInit() {
    this.learningArray = this.words.getLearningArray()
  }

}
