import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges
} from "@angular/core";


import { TabState } from "src/app/models/tab-models";

import { TabComponent } from "../tab/tab.component";



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Input() public isAllVisible: boolean;
  @Output() public disableTab = new EventEmitter<TabState>();
  public lastDeletedTabState: TabState;


  get isDeleteIconVisible(): boolean {
    const enabledTabs = this.tabs.toArray().filter(tab => !tab.isDisabled);

    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }

    return enabledTabs.length > 1 ? true : false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isAllVisible'].currentValue && this.tabs) {
      this.tabs.toArray().find(tab => (tab.isDisabled = false))
    }

    const activeTabs = this.tabs?.filter(tab => tab.active && tab.tabTitle !== this.lastDeletedTabState.name);

    if (activeTabs?.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
  }

  public disableCurrentTab(title: string): void {
    const currentTab = this.tabs.filter(tab => tab.tabTitle === title);

    if (currentTab) {
      currentTab[0].isDisabled = true;
      this.lastDeletedTabState = {
        name: currentTab[0].tabTitle,
        isDisabled: true
      }

      this.disableTab.emit(this.lastDeletedTabState)
    }

    const disabledTabsNumber = this.tabs?.filter(tab => tab.isDisabled).length;
    if (disabledTabsNumber === 2) {
      this.selectTab(this.tabs.first);
    }
  }
}
