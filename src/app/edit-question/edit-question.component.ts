import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss']
})

export class EditQuestionComponent {
    constructor(
        private sharedService: SharedService
    ) {
        sharedService.questionData$.subscribe(
            data => {
                this.question = data.question.question;
                this.answer = data.question.answer;
            });
    }

    question: string;
    answer: any;

    ngOnInit() {
        
    }

    public doEdit() {
        this.sharedService.editQuestion(this.sharedService.question_id, this.question, this.answer);
        this.sharedService.setEditQuestionPopup(false);
    }

    public hideEditQuestion() {
        this.sharedService.setEditQuestionPopup(false);
    }
}