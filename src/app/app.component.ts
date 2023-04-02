import { Component } from '@angular/core';

import { TabState } from './models/tab-models';
import { DEFAULT_TABS } from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public tabs = DEFAULT_TABS;
  public disabledTabs: string[] = [];
  public isAllVisible = true;


  disableTab(currentTab: TabState): void {
    this.tabs.map(tab => {
      if (tab.name === currentTab.name) {
        tab.isDisabled = currentTab.isDisabled
      }
      return tab
    });

    this.isAllVisible = false;
  }

  returnTab(): void {
    this.tabs.map(tab => {
      if (tab.isDisabled) {
        tab.isDisabled = false
      }
      return tab
    });

    this.isAllVisible = true;
  }
}
