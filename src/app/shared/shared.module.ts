import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from "@angular/common/http";
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [
    ],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatSelectModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatSelectModule
    ]
  })
  export class SharedModule { }