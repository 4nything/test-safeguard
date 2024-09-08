import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { INote } from "../../shared/types/note";

@Injectable()
export class NotesService {
  private _notes: INote[] = [];
  private _notesSubject: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>(this._notes);
  public notes$: Observable<INote[]> = this._notesSubject.asObservable();

  getNotes(): Observable<INote[]> {
    return this.notes$;
  }

  addNote(note: INote): void {
    this._notes.push(note);
    this._notesSubject.next([...this._notes]);
  }
}
