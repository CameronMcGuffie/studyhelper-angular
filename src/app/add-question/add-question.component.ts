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

    question: string;
    answer: string;

    ngOnInit() {

    }

    public doAddQuestion() {
        this.sharedService.addQuestion(this.question, this.answer);
        this.sharedService.setAddQuestionPopup(false);
    }

    public hideAddQuestion() {
        this.sharedService.setAddQuestionPopup(false);
    }
}