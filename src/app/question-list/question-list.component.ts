import { Component } from '@angular/core';
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
        public readonly sharedService: SharedService
    ) { }

    id: number;
    questions: any;
    subject_name: string;
    private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.sharedService.subject_id = this.id;
            this.sharedService.getQuestions(this.id);
            this.sharedService.getSubjectName(this.id);
        });
    }

    public showAddQuestion() {
        this.sharedService.setAddQuestionPopup(true);
    }

    public showRunQuestions() {
        this.sharedService.setRunQuestionsPopup(true);
    }

    public showDeleteQuestion(id) {
        this.sharedService.setSelectedQuestion(id);
        this.sharedService.setDeleteQuestionPopup(true);
    }

    public showEditQuestion(id) {
        this.sharedService.setSelectedQuestion(id);
        this.sharedService.getQuestion(id);
        this.sharedService.setEditQuestionPopup(true);
    }
}