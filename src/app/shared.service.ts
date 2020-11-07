import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedService {
    constructor(
        private http: HttpClient
    ) {

    }

    item_id: number;
    delete_subject: boolean;
    edit_subject: boolean;
    add_subject: boolean;

    private updateSubjects = new Subject<boolean>();
    private updateView = new Subject<boolean>();

    updateSubjects$ = this.updateSubjects.asObservable();
    updateView$ = this.updateView.asObservable();

    public ngOnInit() {
        this.item_id = 0;

        this.delete_subject = false;
        this.edit_subject = false;
        this.add_subject = false;
    }

    setSelectedItem(id) {
        this.item_id = id;
    }

    setAddSubjectPopup(val) {
        this.add_subject = val;
        this.updateView.next(true);
    }

    setDeleteSubjectPopup(val) {
        this.delete_subject = val;
        this.updateView.next(true);
    }

    setEditSubjectPopup(val) {
        this.edit_subject = val;
        this.updateView.next(true);
    }

    doUpdateSubjects() {
        this.updateSubjects.next(true);
    }

    getSubjectName(id): any {
        return this.http.get<any>('http://studyhelper.cameronmcguffie.com/api/subject.php?id=' + id);
    }

    addSubject(name) {
        this.http.post('http://studyhelper.cameronmcguffie.com/api/addsubject.php', { name: name }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    editSubject(id, name) {
        this.http.post('http://studyhelper.cameronmcguffie.com/api/editsubject.php', { id: id, name: name }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    deleteSubject(id) {
        this.http.post('http://studyhelper.cameronmcguffie.com/api/delsubject.php', { id: id }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }
}