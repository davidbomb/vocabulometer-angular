import { Component, OnInit, Directive, ViewChild, AfterViewInit } from '@angular/core';
import { learningArray } from '../words/words.component.ts'
import { WordsComponent } from '../words/words.component.ts'
import { WordService } from '../word.service'


@Component({
  selector: 'app-syn-quizz',
  templateUrl: './syn-quizz.component.html',
  styleUrls: ['./syn-quizz.component.css']
})
export class SynQuizzComponent implements OnInit {

  private user_id: number;
  private word_id: number;
  private learningArray: String[] = [];
  private lg_src: string;
  private word: string;
  private answer1: string;
  private answer2: string;
  private answer3: string;
  private answer4: string;
  private translation: string;
  private wrong_translation: string;
  private score: number;
  private index: number;
  private quizzStart: boolean;
  private learningArrayLength:number = 10;

  user_id = '222';
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

  constructor() { }

  ngOnInit() {
  }

}
