import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'delete-subject',
    templateUrl: './delete-subject.component.html',
    styleUrls: ['./delete-subject.component.scss']
})

export class DeleteSubjectComponent {
    constructor(
      private sharedService: SharedService
    ) { }

    public doDelete() {
        this.sharedService.deleteSubject(this.sharedService.item_id);
        this.sharedService.setDeleteSubjectPopup(false);
    }

    public hideDelete() {
        this.sharedService.setDeleteSubjectPopup(false);
    }
}