import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderMaterialModule } from './header.material.module';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HeaderMaterialModule
  ],
  exports: [ToolbarComponent]
})
export class HeaderModule { }
