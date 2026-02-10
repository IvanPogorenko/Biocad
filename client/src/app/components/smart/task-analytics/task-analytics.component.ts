import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FilterButtonComponent} from '../../ui/filter-button/filter-button.component';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {DatePickerComponent} from '../../ui/date-picker/date-picker.component';
import {DownloadBtnComponent} from '../../ui/download-btn/download-btn.component';
import {DownloadFormat} from '../../ui/download-btn/download-format.type';
import {DateRangeInterface} from '../../ui/date-picker/DateRange.interface';
import {PaginationComponent} from '../../ui/pagination/pagination.component';
import {Store} from '@ngrx/store';
import {Experiments, ITaskExtends} from '../../../store/models/task-extends.model';
import {combineLatest, Subscription} from 'rxjs';
import {selectTaskError, selectTaskExtends, selectTaskLoading} from '../../../store/selectors/task-extends.selector';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-task-analytics',
  standalone: true,
  imports: [
    FilterButtonComponent,
    NgForOf,
    KeyValuePipe,
    DatePickerComponent,
    DownloadBtnComponent,
    PaginationComponent,
    NgIf
  ],
  templateUrl: './task-analytics.component.html',
  styleUrl: './task-analytics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAnalyticsComponent implements OnInit, OnDestroy{

  constructor(
    private _store: Store,
    private _cdr: ChangeDetectorRef
  ) {
  }

  private storeSub!: Subscription
  public task: ITaskExtends | null = null
  public loading = false
  public error: string | null = null

  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent
  @ViewChild('ExportContent') exportedContent!: ElementRef

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

  public rowsPerPage: number = 2
  public linesByPages: { [key: number]: Experiments[] } = {};
  public currentPage: number = 1

  ngOnInit() {
    this.subscribeToStore()
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe()
    }
  }

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

  public async downloadTable(format: DownloadFormat){
    if (format === 'PDF') {
      const element = this.exportedContent.nativeElement
      const canvas = await html2canvas(element, {scale: 2})
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`report_${Date.now()}.pdf`)
    }
  }

  public changeDateRange(newDateRange: DateRangeInterface){
    this.dateRange = {
      startDate: newDateRange.startDate,
      endDate: newDateRange.endDate
    }
  }

  public calcRows(): number {
    const lines = this.task?.experiments.length
    if (lines){
      return lines
    }
    return 0
  }

  public showFirstPage(){
    this.currentPage = 1
  }
  public showPrevPage(){
    this.currentPage --
  }
  public showNextPage(){
    this.currentPage ++
  }
  public showLastPage(){
    const keys = Object.keys(this.linesByPages)
    const lastKey = keys[keys.length -1]
    this.currentPage = Number(lastKey)
  }

  public changeRowsPerPage(count: number){
    this.rowsPerPage = count
    this.rebuildLinesByPages()
  }

  public rebuildLinesByPages() {
    this.linesByPages = {}
    const experiments = this.task?.experiments
    if (experiments && experiments.length > 0) {
      let step = 1
      for (let i = 0; i < experiments.length; i += this.rowsPerPage) {
        this.linesByPages[step] = experiments.slice(i, i + this.rowsPerPage)
        step++;
      }
    }
  }

  private subscribeToStore(): void {
    this.storeSub = combineLatest([
      this._store.select(selectTaskExtends),
      this._store.select(selectTaskLoading),
      this._store.select(selectTaskError)
    ]).subscribe(([task, loading, error]) => {
      this.task = task
      this.loading = loading
      this.error = error

      if (this.task){
        this.rebuildLinesByPages()
      }

      if (error) {
        console.error('Error from store:', error)
      }

      this._cdr.detectChanges()
    });
  }

}
