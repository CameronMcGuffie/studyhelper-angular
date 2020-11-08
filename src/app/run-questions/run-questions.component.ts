import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'run-questions',
    templateUrl: './run-questions.component.html',
    styleUrls: ['./run-questions.component.scss']
})

export class RunQuestionsComponent {
    constructor(
        private sharedService: SharedService
    ) {
        sharedService.questionList$.subscribe(
            data => {
                this.questions = data.questions;
                if (this.questions) {
                    this.question = this.questions[this.question_id].question;
                    this.answer = this.questions[this.question_id].answer;
                    this.question_count = (Object.keys(this.questions).length - 1);
                }
            });
    }

    questions: any;
    question: string;
    your_answer: string;
    answer: any;
    question_id: number;
    question_count: number;
    show_answer: boolean;
    answer_button: string;
    right_answer: number;
    wrong_answer: number;

    ngOnInit() {
        this.question_id = 0;
        this.right_answer = 0;
        this.wrong_answer = 0;
        this.show_answer = false;
        this.updateAnswerButton();

        this.sharedService.getQuestions(this.sharedService.subject_id);
    }

    public toggleAnswer() {
        this.show_answer = !this.show_answer;
        this.updateAnswerButton();
    }

    public updateAnswerButton() {
        if (this.show_answer) {
            this.answer_button = "Hide Answer";
        } else {
            this.answer_button = "Show Answer";
        }
    }

    public previousQuestion() {
        this.show_answer = false;
        this.your_answer = "";
        this.updateAnswerButton();

        if (this.question_id > 0) {
            this.question_id--;
            this.question = this.questions[this.question_id].question;
            this.answer = this.questions[this.question_id].answer;
        }
    }

    public nextQuestion() {
        this.show_answer = false;
        this.your_answer = "";
        this.updateAnswerButton();

        if (this.question_id < this.question_count) {
            this.question_id++;
            this.question = this.questions[this.question_id].question;
            this.answer = this.questions[this.question_id].answer;
        }
    }

    public hideEditQuestion() {
        this.sharedService.setRunQuestionsPopup(false);
    }

    public answerResult(result) {
        if(result) {
            this.right_answer++;
        } else {
            this.wrong_answer++;
        }
    }
}