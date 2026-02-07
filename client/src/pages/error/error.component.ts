import { Component } from '@angular/core';
import {RoutingService} from '../../app/routing.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(
    private _routingService: RoutingService
  ) {
  }

  public navigateToMain(){
    this._routingService.navigateToDashboard()
  }

}
