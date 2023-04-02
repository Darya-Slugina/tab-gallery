import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common'


import { GridTilesComponent } from "../grid-tile/grid-tile.component";
import { TabComponent } from "../tab/tab.component";

import { TabsComponent } from "./tabs.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [TabsComponent, TabComponent, GridTilesComponent],
  exports: [TabsComponent, TabComponent]
})
export class TabsModule { }