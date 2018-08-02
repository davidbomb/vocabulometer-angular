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

  constructor(private wordService: WordService) { }


  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }


  nextQuizz(){  // refresh the quizz after each answer
    if(!this.quizzStart) this.quizzStart = true;
    if(this.index < this.learningArrayLength){
      this.synArray = [];   // set the synArray to None to erase previous random words
      this.word = this.words.getLearningArray()[this.index];

      // fetch a synonym and mixing the answer with random words from srs
      this.wordService.getSynonym(this.word)
      .then( result => {
        this.answer1 = result;
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
