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
  private lg_src: string;
  private lg_dst: string;
  private word: string;
  private translation: string;
  private wrong_translation: string;
  private score: number;
  private index: number;

  // Initialisation of the Quizz
  word = 'turtle';
  translation = 'tortue';
  lg_src = 'English';
  lg_dst = 'French';
  index = 0;
  score = 0;
  console.log(learningArray)


  @ViewChild(WordsComponent) words: WordsComponent;


  constructor() { }

  nextQuizz(){
    if(this.index < 10){
      this.index++;
      this.word = this.words.getLearningArray()[this.index];
    }
    else {
      this.word = 'End of Quizz'
    }

  }

  ngOnInit() {

    this.learningArray = this.words.getLearningArray()
    console.log(this.learningArray)


  }

}
