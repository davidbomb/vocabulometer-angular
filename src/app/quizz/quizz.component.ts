import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  user_id: number;
  word_id: number;
  lg_src: string;
  lg_dst: string;
  word: string;
  translation: string;
  wrong_translation: string;
  score: number;


  word = 'turtle';
  translation = 'tortue'
  lg_src = 'French';
  lg_dst = 'English'

  constructor() { }

  ngOnInit() {


  }

}
