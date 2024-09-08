import { Component } from '@angular/core';
import { NotesService } from "./notes.service";
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import moment from 'moment';
import { INote } from '../../shared/types/note';

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [FormsModule, NgForOf, AsyncPipe],
    providers: [NotesService],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.scss'
})
export class NotesComponent {
    notes$!: Observable<INote[]>;
    newNote: string = '';

    constructor(private notesService: NotesService) {
        this.notes$ = this.notesService.getNotes();
    }

    addNote(): void {
        const value = this.newNote.trim();
        if (Boolean(value)) {
            this.notesService.addNote({ text: value, date: new Date().toISOString() });
            this.newNote = '';
        }
    }

    getDate(date: string) {
        return moment(date).fromNow();
    }
}
