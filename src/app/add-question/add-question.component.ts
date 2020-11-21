import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss']
})

export class AddQuestionComponent {
    constructor(
        private sharedService: SharedService
    ) { }

    error: string;
    question: string;
    answer: string;

    ngOnInit() {

    }

    public doAddQuestion() {
        this.sharedService.addQuestion(this.question, this.answer).then(
            () => {
                this.sharedService.setAddQuestionPopup(false);
            },
            () => {
                this.error = "Could not add question. Check the details aren't blank and try again.";
            }
        );
    }

    public hideAddQuestion() {
        this.sharedService.setAddQuestionPopup(false);
    }
}