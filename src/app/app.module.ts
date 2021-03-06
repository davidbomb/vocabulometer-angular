import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizzComponent } from './quizz/quizz.component';
import { SynQuizzComponent } from './syn-quizz/syn-quizz.component';
import { DefQuizzComponent } from './def-quizz/def-quizz.component';


@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    QuizzComponent,
    SynQuizzComponent,
    DefQuizzComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
