import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'run-questions',
    templateUrl: './run-questions.component.html',
    styleUrls: ['./run-questions.component.scss']
})

export class RunQuestionsComponent {
    constructor(
        public readonly sharedService: SharedService
    ) { }

    question: string;
    answer: any;
    your_answer: string;
    question_id: number;
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

        this.question = this.sharedService.questions[this.question_id].question;
        this.answer = this.sharedService.questions[this.question_id].answer;
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
            this.question = this.sharedService.questions[this.question_id].question;
            this.answer = this.sharedService.questions[this.question_id].answer;
        }
    }

    public nextQuestion() {
        this.show_answer = false;
        this.your_answer = "";
        this.updateAnswerButton();

        if (this.question_id < this.sharedService.question_count) {
            this.question_id++;
            this.question = this.sharedService.questions[this.question_id].question;
            this.answer = this.sharedService.questions[this.question_id].answer;
        }
    }

    public hideRunQuestions() {
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