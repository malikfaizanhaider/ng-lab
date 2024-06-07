import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: '[app-form]',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    JsonPipe,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class FormComponent {
  form: FormGroup;
  tagTypes = ['Tag1', 'Tag2', 'Tag3', 'other']; // replace with your actual tag types

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      fields: this.fb.array([this.createField()])
    });
  }

  createField(): FormGroup {
    const field = this.fb.group({
      number: [0, Validators.required],
      tag_descr: ['', Validators.required],
      tag_type: ['', Validators.required],
      tag_type_other: ['']
    });

    field.get('tag_type').valueChanges.subscribe(value => {
      if (value !== 'Other') {
        field.get('tag_type_other').reset();
      }
    });

    return field;
  }

  get fields() {
    return this.form.get('fields') as FormArray;
  }

  addField() {
    if (this.fields.length < 51) {
      this.fields.push(this.createField());
    } else {
      console.log('Maximum limit of 53 fields reached');
    }
  }

  onTagTypeChange(event: any, i: number): void {
    const selectedTagType = event.target.value;
    this.fields.at(i).get('tag_type').setValue(selectedTagType);
  }

  deleteField(index: number) {
    this.fields.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
