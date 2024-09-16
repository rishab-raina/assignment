import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  
  exports: [
  
    MatButtonModule,
    MatIconModule,
    MatToolbarModule

  ]
})
export class HeaderMaterialModule { }
