import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {DownloadFormat} from './download-format.type';

@Component({
  selector: 'app-download-btn',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './download-btn.component.html',
  styleUrl: './download-btn.component.scss'
})
export class DownloadBtnComponent {

  @Output() download = new EventEmitter<DownloadFormat>()

  public isDropdownOpen = false
  public selectedFormat : DownloadFormat = 'PDF'

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  public selectFormat(format: DownloadFormat): void {
    if (this.selectedFormat !== format) {
      this.selectedFormat = format;
    }
    this.isDropdownOpen = false;
  }

  public onDownload(): void {
    this.download.emit(this.selectedFormat);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.download-btn__main')) {
      this.isDropdownOpen = false
    }
  }

}
