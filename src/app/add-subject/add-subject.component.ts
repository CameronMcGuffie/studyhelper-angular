import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'add-subject',
    templateUrl: './add-subject.component.html',
    styleUrls: ['./add-subject.component.scss']
})

export class AddSubjectComponent {
    constructor(
        public sharedService: SharedService
    ) { }

    error: string;
    subject_name: string;

    ngOnInit() {
        this.error = "";
    }

    doAddSubject() {
        this.sharedService.addSubject(this.subject_name).then(
            () => {
                this.sharedService.setAddSubjectPopup(false);
            },
            () => {
                this.error = "Could not add subject. Check the name and try again.";
            }
        );
    }

    hideAddSubject() {
        this.sharedService.setAddSubjectPopup(false);
    }
}