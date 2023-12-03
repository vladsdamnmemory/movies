import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    CardModule
  ],
  standalone: true
})
export class MovieThumbnailComponent extends BaseComponent {

}
