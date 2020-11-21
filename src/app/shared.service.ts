import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class SharedService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    serviceURL: string = "https://studyhelper.cameronmcguffie.com/api/api.php";

    subjects: any;
    subject_id: number;
    subject_name: string;
    delete_subject: boolean;
    edit_subject: boolean;
    add_subject: boolean;

    questions: any;
    question_count: number;
    question_id: number;
    add_question: boolean;
    delete_question: boolean;
    edit_question: boolean;
    run_questions: boolean;

    question_data: string;
    answer_data: string;

    error: boolean;
    error_title: string;
    error_info: string;

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

        this.error = false;
        this.error_title = "";
        this.error_info = "";
    }

    throwError(title, info) {
        this.error_title = title;
        this.error_info = info;
        this.error = true;
    }

    setSelectedSubject(id) {
        this.subject_id = id;
    }

    setSelectedQuestion(id) {
        this.question_id = id;
    }

    setAddSubjectPopup(val) {
        this.add_subject = val;
    }

    setAddQuestionPopup(val) {
        this.add_question = val;
    }

    setDeleteSubjectPopup(val) {
        this.delete_subject = val;
    }

    setDeleteQuestionPopup(val) {
        this.delete_question = val;
    }

    setEditSubjectPopup(val) {
        this.edit_subject = val;
    }

    setEditQuestionPopup(val) {
        this.edit_question = val;
    }

    setRunQuestionsPopup(val) {
        this.run_questions = val;
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
                    } else if(error.status == 500) {
                        this.throwError("Server Error", "A server error has occured, please reload and try again.");
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
                    } else if(error.status == 500) {
                        this.throwError("Server Error", "A server error has occured, please reload and try again.");
                    }

                    reject();
                });
        });

        return promise;
    }

    getSubjects() {
        this.subjects = [];

        this.doGet({ "func": "subjects" }).then(
            (data) => { 
                this.subjects = data.subjects || [];
            }
        );
    }

    getQuestions(subject_id) {
        this.question_count = 0;
        this.questions = [];

        this.doGet({ "func": "questions", "subject_id": subject_id }).then(
            (data) => { 
                this.questions = data.questions || [];
                this.question_count = (Object.keys(this.questions).length - 1); 
            }
        );
    }

    getSubjectName(id): any {
        this.subject_name = "";

        this.doGet({ "func": "subject", "id": id }).then(
            (data) => { this.subject_name = data.subject.name; }
        );
    }

    getQuestion(question_id) {
        this.question_data = "";
        this.answer_data = "";

        this.doGet({ "func": "get_question", "question_id": question_id }).then(
            (data) => { 
                this.question_data = data.question.question;
                this.answer_data = data.question.answer;
             }
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