import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  fb = inject(FormBuilder);

  editable?: number

  myForm = this.fb.group({
    name: ['', Validators.required],
    items: this.fb.array([])
  });

  addItem() {
    if (this.editable !== undefined) return

    const item = this.fb.group({
      calle: ['', Validators.required],
      numero: ['', Validators.required]
    })
    const formArray = this.myForm.controls.items as FormArray
    formArray.push(item);

    this.editable = formArray.length - 1;
  }

  editItem(i: number) {
    if (this.editable !== undefined) return
    this.editable = i;
  }

  removeItem(i: number) {
    if (this.editable !== undefined) return
    const formArray = this.myForm.controls.items as FormArray
    formArray.removeAt(i);
  }

  acceptItem() {
    if (!this.myForm.valid) return
    this.editable = undefined;
  }

  cancelItem() {
    const formArray = this.myForm.controls.items as FormArray
    formArray.removeAt(this.editable!);
    this.editable = undefined;
  }

  getInfo(item: any) {
    return `${item.controls.calle.value} ${item.controls.numero.value}`;
  }

  onSubmit() {
    if (this.editable !== undefined) return

    if (!this.myForm.valid) return

    console.log(this.myForm.value);
  }

  hasError(item: FormControl, field: string) {
    const control = item.get(field)
    if (!control) return false
    return control.invalid && (control.dirty || control.touched)
  }

}
