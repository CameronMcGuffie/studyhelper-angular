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
    add_question: boolean;

    private updateSubjects = new Subject<boolean>();
    private updateView = new Subject<boolean>();
    private questionList = new Subject<any>();

    updateSubjects$ = this.updateSubjects.asObservable();
    updateView$ = this.updateView.asObservable();
    questionList$ = this.questionList.asObservable();

    public ngOnInit() {
        this.item_id = 0;

        this.delete_subject = false;
        this.edit_subject = false;
        this.add_subject = false;
        this.add_question = false;
    }

    setSelectedItem(id) {
        this.item_id = id;
    }

    setAddSubjectPopup(val) {
        this.add_subject = val;
        this.updateView.next(true);
    }

    setAddQuestionPopup(val) {
        this.add_question = val;
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

    getQuestions(subject) {
        this.http.get<any>('https://studyhelper.cameronmcguffie.com/api/questions.php?subject=' + subject).subscribe({
            next: data => {
                this.questionList.next(data.questions);
            },
            error: error => { }
        });
    }

    getSubjectName(id): any {
        return this.http.get<any>('https://studyhelper.cameronmcguffie.com/api/subject.php?id=' + id);
    }

    addSubject(name) {
        this.http.post('https://studyhelper.cameronmcguffie.com/api/addsubject.php', { name: name }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    addQuestion(name) {
        this.http.post('https://studyhelper.cameronmcguffie.com/api/addquestion.php', { name: name }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    editSubject(id, name) {
        this.http.post('https://studyhelper.cameronmcguffie.com/api/editsubject.php', { id: id, name: name }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    deleteSubject(id) {
        this.http.post('https://studyhelper.cameronmcguffie.com/api/delsubject.php', { id: id }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }
}