import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedService {
    constructor(
        private http: HttpClient
    ) {

    }

    serviceURL: string = "https://studyhelper.cameronmcguffie.com/api";

    subject_id: number;
    question_id: number;
    delete_subject: boolean;
    edit_subject: boolean;
    add_subject: boolean;

    add_question: boolean;
    delete_question: boolean;
    edit_question: boolean;
    run_questions: boolean;

    private updateSubjects = new Subject<boolean>();
    private updateQuestions = new Subject<boolean>();
    private updateView = new Subject<boolean>();
    private questionList = new Subject<any>();
    private questionData = new Subject<any>();

    updateSubjects$ = this.updateSubjects.asObservable();
    updateQuestions$ = this.updateQuestions.asObservable();
    updateView$ = this.updateView.asObservable();
    questionList$ = this.questionList.asObservable();
    questionData$ = this.questionData.asObservable();

    public ngOnInit() {
        this.subject_id = 0;
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

    doUpdateSubjects() {
        this.updateSubjects.next(true);
    }

    doUpdateQuestions() {
        this.updateQuestions.next(true);
    }

    getQuestions(subject_id) {
        this.http.get(`${this.serviceURL}/api.php?func=questions&subject_id=${subject_id}`).subscribe(data => {
            this.questionList.next(data);
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

    addQuestion(question, answer) {
        this.http.post(`${this.serviceURL}/api.php`, { "func": "add_question", "subject_id": this.subject_id, "question": question, "answer": answer }).subscribe({
            next: data => this.getQuestions(this.subject_id),
            error: error => { }
        });
    }

    editSubject(id, name) {
        this.http.post('https://studyhelper.cameronmcguffie.com/api/editsubject.php', { id: id, name: name }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    editQuestion(question_id, question, answer) {
        this.http.post(`${this.serviceURL}/api.php`, { "func": "edit_question", "question_id": question_id, "question": question, "answer": answer }).subscribe({
            next: data => this.getQuestions(this.subject_id),
            error: error => { }
        });
    }

    deleteSubject(id) {
        this.http.post('https://studyhelper.cameronmcguffie.com/api/delsubject.php', { id: id }).subscribe({
            next: data => this.doUpdateSubjects(),
            error: error => { }
        });
    }

    deleteQuestion() {
        this.http.post(`${this.serviceURL}/api.php`, { "func": "delete_question", "question_id": this.question_id }).subscribe({
            next: data => this.getQuestions(this.subject_id),
            error: error => { }
        });
    }

    getQuestion(question_id) {
        this.http.get(`${this.serviceURL}/api.php?func=get_question&question_id=${question_id}`).subscribe(data => {
            this.questionData.next(data);
        });
    }
}