import { Subject } from "rxjs";

export interface IDataClassService {
    // Emits the field data to be updated
    updateFieldSubject: Subject<any>;

    // Adds a new field to the collection
    addField(newField: any): any;

    // Removes a field with given id from the collection
    // and returns it or null
    removeField(id: number): any;

    // Removes a field with the given id from the collection
    // and emits it via the update subject
    updateField(id: number): any;

    // Returns all the fields
    get fields(): any[];

    //! TODO
    // Submits the form for the data class details
    // submitClassDescription(): any;

    // Emits the generated data class value
    dataClassResultReceivedSubject: Subject<any>;
}
