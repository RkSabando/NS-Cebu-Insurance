import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomDatatableComponent } from './components/custom-datatable/custom-datatable.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { MatSelectModule } from '@angular/material/select';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



const Materials = [
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
]

const Components = [
  ModalComponent,
  SkeletonLoaderComponent,
  CustomInputComponent,
  CustomDatatableComponent,
  CustomSelectComponent,
  LoaderComponent
]

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Materials
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    Materials,
    Components
  ]
})
export class SharedModule { }
