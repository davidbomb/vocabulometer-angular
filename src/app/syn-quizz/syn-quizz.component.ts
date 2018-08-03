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
  private learningArrayLength:number = 10;
  private lg_src: string;
  private word: string;
  private synArray: String[] = [];   //will contain th synonym plus 3 random words
  private rightAnswer: string;
  private userAnswer: string;
  private answer1: string;
  private answer2: string;
  private answer3: string;
  private answer4: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;

//initializing variables
  user_id = '222';
  user_lv = 1;
  word = '';
  answer1 = "";
  answer2 = "";
  answer3 = "";
  answer4 = "";
  rightAnswer = 'zzz'  //to avoid a bug (rightAnswer = userAnswer) when pressing Start Quizz
  quizzStart = false;
  lg_src = 'English';
  index = 0;
  score = 0;







  @ViewChild(WordsComponent) words: WordsComponent;

  constructor(private wordService: WordService) { }  //Some results must be fetched directly from wordService


  shuffleArray(array) {  // used to mix the answers of the quizz
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }
  getClick(event:any) {  // to retrieve the user's response to the quizz
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
        this.wordService.getRandomWords(this.user_id) // get 3 random words from the srs
        .then( res => {
          for(let i = 0; i < res.length; i++){
            this.synArray[i] = res[i].word;
          }
            this.synArray.push(result);
            this.shuffleArray(this.synArray);  //shuffling the answers
            console.log("shuffle: " + this.synArray)

            this.answer1 = this.synArray[0]
            this.answer2 = this.synArray[1]
            this.answer3 = this.synArray[2]
            this.answer4 = this.synArray[3]
        });
      });

      this.words.fetchVocalUrl(this.word);

      this.words.user_id = this.user_id;    // for findWordIdAndRead
      this.words.current_word = this.word;  // and findWordIdAndSucceedTest

      console.log("word: " + this.word)
      console.log("syn: " + this.synonym)
      this.index++;
      if(this.userAnswer === this.rightAnswer){
        console.log("right answer !")
        this.words.findWordIdAndRead();
        this.words.findWordIdAndSucceedTest();
        this.score++;
      }
      else {
        console.log("wrong answer !")
      this.words.findWordIdAndFailTest();
      }
    }


    else {
      if(this.index <= this.learningArrayLength) {
        this.index++;
        if(this.userAnswer === this.rightAnswer){
          console.log("right answer !")
          this.words.findWordIdAndRead();
          this.words.findWordIdAndSucceedTest();
          this.score++;
        }
        else {
          console.log("wrong answer !")
          this.words.findWordIdAndFailTest();
        }
      }
      this.word = 'End of Quizz'
    }

  }



  ngOnInit() {
    this.learningArray = this.words.getLearningArray()
  }

}
