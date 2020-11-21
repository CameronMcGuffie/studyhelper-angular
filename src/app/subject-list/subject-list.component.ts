import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
    selector: 'subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.scss']
})

export class SubjectListComponent {
    constructor(
        private router: Router,
        private http: HttpClient,
        private sharedService: SharedService
    ) {
        sharedService.subjectList$.subscribe(
            data => {
                this.subjects = data.subjects;
            });
    }

    public subjects;

    @Output() item_id: EventEmitter<number> = new EventEmitter<number>();

    @Output() delete_subject: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() edit_subject: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() add_subject: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        this.sharedService.getSubjects();
    }

    public showDelete(id) {
        this.sharedService.setSelectedSubject(id);
        this.sharedService.setDeleteSubjectPopup(true);
    }

    public showEditSubject(id) {
        this.sharedService.setSelectedSubject(id);
        this.sharedService.setEditSubjectPopup(true);
    }

    public showAddSubject() {
        this.sharedService.setAddSubjectPopup(true);
    }

    goToQuestions(id) {
        this.router.navigate(['/questions', id]);
    }
}