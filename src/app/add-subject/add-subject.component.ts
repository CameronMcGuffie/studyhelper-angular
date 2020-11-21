import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'add-subject',
    templateUrl: './add-subject.component.html',
    styleUrls: ['./add-subject.component.scss']
})

export class AddSubjectComponent {
    constructor(
        private sharedService: SharedService
    ) { }

    subject_name: string;

    ngOnInit() {

    }

    public doAddSubject() {
        this.sharedService.addSubject(this.subject_name);
        this.sharedService.setAddSubjectPopup(false);
    }

    public hideAddSubject() {
        this.sharedService.setAddSubjectPopup(false);
    }
}