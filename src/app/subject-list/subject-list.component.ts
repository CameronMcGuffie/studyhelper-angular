import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
    selector: 'subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.scss']
})

export class SubjectListComponent {
    constructor(
        private router: Router,
        public readonly sharedService: SharedService
    ) { }

    public subjects;

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
        this.sharedService.subject_name = "";
        this.router.navigate(['/questions', id]);
    }
}