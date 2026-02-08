import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRangeInterface} from './DateRange.interface';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent{
  @Input() history: boolean = false
  @Output() dateRangeChanged = new EventEmitter<DateRangeInterface>()

  currentDate: Date = new Date()
  startDate: Date | null = null
  endDate: Date | null = null

  activeField: 'start' | 'end' = 'start'

  showCalendar: boolean = false

  monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  get calendarDays(): Array<Date | null> {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = this.getDayOfWeek(firstDay)
    const totalCells = 42
    const daysInMonth = lastDay.getDate()
    const days: Array<Date | null> = []
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    while (days.length < totalCells) {
      days.push(null)
    }
    return days
  }

  get currentMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()]
  }

  public getDayOfWeek(date: Date): number {
    const day = date.getDay()
    return day === 0 ? 6 : day - 1
  }

  public isEmptyDay(day: Date | null): boolean {
    return day === null
  }

  public selectDate(date: Date) {
    if (this.isDateDisabled(date)) return
    if (this.activeField === 'start') {
      this.startDate = date
      this.activeField = 'end'
    } else {
      this.endDate = date
      this.showCalendar = false
      this.activeField = 'start'
    }
    this.emitDateRange()
  }

  public isDateSelected(date: Date): boolean {
    if (!this.startDate && !this.endDate) return false
    const dateStr = date.toDateString()
    if (this.startDate && this.startDate.toDateString() === dateStr) return true
    if (this.endDate && this.endDate.toDateString() === dateStr) return true
    return false
  }

  public isDateInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false
    const time = date.getTime()
    const startTime = this.startDate.getTime()
    const endTime = this.endDate.getTime()
    return time >= Math.min(startTime, endTime) && time <= Math.max(startTime, endTime)
  }

  public isToday(date: Date): boolean {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  public isDateDisabled(date: Date): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dateToCheck = new Date(date)
    dateToCheck.setHours(0, 0, 0, 0)
    if (this.history) {
      return dateToCheck > today
    } else {
      return dateToCheck < today
    }
  }

  public changeMonth(direction: number) {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + direction,
      1
    )
  }

  public openCalendarFor(field: 'start' | 'end') {
    this.activeField = field
    this.showCalendar = true
  }

  public closeCalendar() {
    this.showCalendar = false
  }

  public formatDate(date: Date | null): string {
    if (!date) return ''
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}, 10:55`
  }

  public clearSelection() {
    this.startDate = null
    this.endDate = null
    this.activeField = 'start'
    this.emitDateRange()
  }

  private emitDateRange() {
    this.dateRangeChanged.emit({
      startDate: this.startDate,
      endDate: this.endDate
    })
  }
}
