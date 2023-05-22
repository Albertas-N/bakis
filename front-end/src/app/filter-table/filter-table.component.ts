import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent {
  keywords: string[] = [];
  @Output() keywordsChanged = new EventEmitter<string[]>();

  addKeyword(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.keywords.push(value.trim());
      this.keywordsChanged.emit(this.keywords);
    }

    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.keywordsChanged.emit(this.keywords);
    }
  }
}