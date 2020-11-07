import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent {
    id: number;
    private sub: any;

    @Output() delete_question: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() item_id: EventEmitter<number> = new EventEmitter<number>();

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
            console.log("Load questions for " + this.id);
        });
    }

    public showDelete(id) {
        this.item_id.emit(id);
        this.delete_question.emit(true);
    }
}