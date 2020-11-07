import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
    selector: 'question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent {
    constructor(
        private route: ActivatedRoute,
        private sharedService: SharedService
    ) {
        sharedService.questionList$.subscribe(
            data => {
                this.questions = data
            });
    }

    id: number;
    questions: any;
    subject_name: string;
    private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
            console.log("Load questions for " + this.id);

            this.sharedService.getQuestions(this.id);
            this.sharedService.getSubjectName(this.id).subscribe(data => {
                this.subject_name = data.subject.name;
            });
        });
    }
}