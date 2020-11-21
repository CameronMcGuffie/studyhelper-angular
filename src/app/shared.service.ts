import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatWithOptions } from 'util';

@Injectable()
export class SharedService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    serviceURL: string = "https://studyhelper.cameronmcguffie.com/api/api.php";

    subject_id: number;
    subject_name: string;
    question_id: number;
    delete_subject: boolean;
    edit_subject: boolean;
    add_subject: boolean;

    add_question: boolean;
    delete_question: boolean;
    edit_question: boolean;
    run_questions: boolean;

    private subjectList = new Subject<any>();
    private subjectName = new Subject<string>();

    private updateView = new Subject<boolean>();
    private questionList = new Subject<any>();
    private questionData = new Subject<any>();

    subjectList$ = this.subjectList.asObservable();
    subjectName$ = this.subjectName.asObservable();

    updateView$ = this.updateView.asObservable();
    questionList$ = this.questionList.asObservable();
    questionData$ = this.questionData.asObservable();

    public ngOnInit() {
        this.subject_id = 0;
        this.subject_name = "";
        this.delete_subject = false;
        this.edit_subject = false;
        this.add_subject = false;

        this.question_id = 0;
        this.add_question = false;
        this.delete_question = false;
        this.edit_question = false;
        this.run_questions = false;
    }

    setSelectedSubject(id) {
        this.subject_id = id;
    }

    setSelectedQuestion(id) {
        this.question_id = id;
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

    setDeleteQuestionPopup(val) {
        this.delete_question = val;
        this.updateView.next(true);
    }

    setEditSubjectPopup(val) {
        this.edit_subject = val;
        this.updateView.next(true);
    }

    setEditQuestionPopup(val) {
        this.edit_question = val;
        this.updateView.next(true);
    }

    setRunQuestionsPopup(val) {
        this.run_questions = val;
        this.updateView.next(true);
    }

    doGet(options): any {
        var promise = new Promise((resolve, reject) => {
            var params = "";

            Object.entries(options).forEach(([key, value]) => {
                if (params != "") { params = params + "&"; }

                params += `${key}=${value}`;
            });

            this.http.get(`${this.serviceURL}?${params}`).subscribe(
                data => {
                    resolve(data);
                },
                error => {
                    if (error.status == 403) {
                        this.router.navigate([`/`], {});
                    }

                    reject();
                });
        });

        return promise;
    }

    doPost(options): any {
        var promise = new Promise((resolve, reject) => {
            this.http.post(`${this.serviceURL}`, options).subscribe(
                data => {
                    resolve(data);
                },
                error => {
                    if (error.status == 403) {
                        this.router.navigate([`/`], {});
                    }

                    reject();
                });
        });

        return promise;
    }

    getSubjects() {
        this.doGet({ "func": "subjects" }).then(
            (data) => { this.subjectList.next(data); }
        );
    }

    getQuestions(subject_id) {
        this.doGet({ "func": "questions", "subject_id": subject_id }).then(
            (data) => { this.questionList.next(data); }
        );
    }

    getSubjectName(id): any {
        this.doGet({ "func": "subject", "id": id }).then(
            (data) => { this.subjectName.next(data.subject.name); }
        );
    }

    getQuestion(question_id) {
        this.doGet({ "func": "get_question", "question_id": question_id }).then(
            (data) => { this.questionData.next(data); }
        );
    }

    addSubject(name) {
        this.doPost({ "func": "add_subject", name: name }).then(
            (data) => { this.getSubjects(); }
        );
    }

    addQuestion(question, answer) {
        this.doPost({ "func": "add_question", "subject_id": this.subject_id, "question": question, "answer": answer }).then(
            (data) => { this.getQuestions(this.subject_id); }
        );
    }

    editSubject(id, name) {
        this.doPost({ "func": "edit_subject", id: id, name: name }).then(
            (data) => { this.getSubjects(); }
        );
    }

    editQuestion(question_id, question, answer) {
        this.doPost({ "func": "edit_question", "question_id": question_id, "question": question, "answer": answer }).then(
            (data) => { this.getQuestions(this.subject_id); }
        );
    }

    deleteSubject(id) {
        this.doPost({ "func": "delete_subject", id: id }).then(
            (data) => { this.getSubjects(); }
        );
    }

    deleteQuestion() {
        this.doPost({ "func": "delete_question", "question_id": this.question_id }).then(
            (data) => { this.getQuestions(this.subject_id); }
        );
    }
}