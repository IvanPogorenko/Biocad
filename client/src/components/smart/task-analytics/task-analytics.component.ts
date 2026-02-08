import {Component, ViewChild} from '@angular/core';
import {FilterButtonComponent} from '../../ui/filter-button/filter-button.component';
import {KeyValuePipe, NgForOf} from '@angular/common';
import {DatePickerComponent} from '../../ui/date-picker/date-picker.component';
import {DownloadBtnComponent} from '../../ui/download-btn/download-btn.component';
import {DownloadFormat} from '../../ui/download-btn/download-format.type';
import {DateRangeInterface} from '../../ui/date-picker/DateRange.interface';
import {PaginationComponent} from '../../ui/pagination/pagination.component';

@Component({
  selector: 'app-task-analytics',
  standalone: true,
  imports: [
    FilterButtonComponent,
    NgForOf,
    KeyValuePipe,
    DatePickerComponent,
    DownloadBtnComponent,
    PaginationComponent
  ],
  templateUrl: './task-analytics.component.html',
  styleUrl: './task-analytics.component.scss'
})
export class TaskAnalyticsComponent {

  constructor() {
  }

  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent

  public periods = [
    {key: 1, name: 'День'},
    {key: 7, name: 'Неделя'},
    {key: 14, name: '2 недели'},
    {key: 30, name: 'Месяц'},
    {key: 90, name: '3 месяца'},
    {key: 180, name: 'Полгода'}
  ]
  public selectedPeriod: number | null = null;
  public dateRange: DateRangeInterface = {
    startDate: null,
    endDate: null
  }

  public rowsPerPage: number = 0

  public onPeriodSelect(selectedKey: number) {
    const today = new Date()
    let lastDay = new Date(today)
    lastDay.setDate(lastDay.getDate() - selectedKey);
    const dateRange: DateRangeInterface = {
      startDate: today,
      endDate: lastDay
    }
    if (this.datePicker){
      this.datePicker.clearSelection()
    }
    this.selectedPeriod = selectedKey
    this.changeDateRange(dateRange)
  }

  public datesFromDatePicker(newDateRange: DateRangeInterface){
    this.selectedPeriod = null
    this.changeDateRange(newDateRange)
  }

  public downloadTable(format: DownloadFormat){
    console.log(`скачать в формате ${format}`)
  }

  public changeDateRange(newDateRange: DateRangeInterface){
    this.dateRange = {
      startDate: newDateRange.startDate,
      endDate: newDateRange.endDate
    }
    console.log(this.dateRange)
  }

  public showFirstPage(){}
  public showPrevPage(){}
  public showNextPage(){}
  public showLastPage(){}

  public changeRowsPerPage(count: number){
    this.rowsPerPage = count
  }

}
