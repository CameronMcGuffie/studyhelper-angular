import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'edit-subject',
    templateUrl: './edit-subject.component.html',
    styleUrls: ['./edit-subject.component.scss']
})

export class EditSubjectComponent {
    constructor(
        private sharedService: SharedService
    ) {
        sharedService.subjectName$.subscribe(
            data => {
                this.subject_name = data;
            });
    }

    subject_name: string;

    ngOnInit() {
        this.sharedService.getSubjectName(this.sharedService.subject_id);
    }

    public doEdit() {
        this.sharedService.editSubject(this.sharedService.subject_id, this.subject_name);
        this.sharedService.setEditSubjectPopup(false);
    }

    public hideEditSubject() {
        this.sharedService.setEditSubjectPopup(false);
    }
}