import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'edit-subject',
    templateUrl: './edit-subject.component.html',
    styleUrls: ['./edit-subject.component.scss']
})

export class EditSubjectComponent {
    constructor(
        public sharedService: SharedService
    ) { }

    subject_name: string;

    ngOnInit() {
        this.sharedService.getSubjectName(this.sharedService.subject_id);
    }

    public doEdit() {
        this.sharedService.editSubject(this.sharedService.subject_id, this.sharedService.subject_name);
        this.sharedService.setEditSubjectPopup(false);
    }

    public hideEditSubject() {
        this.sharedService.setEditSubjectPopup(false);
    }
}