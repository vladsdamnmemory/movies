import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {BaseComponent} from "../base/base.component";
import {NgIf} from "@angular/common";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    CardModule,
    NgIf,
    TagModule
  ],
  standalone: true
})
export class MovieThumbnailComponent extends BaseComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() rating = '';
  @Input() duration = '';
  @Input() genre = '';
  @Input() released = '';
  @Input() trailer = '';
  @Input() img = '';
  @Input() inWatchList = false;

  @Output() onAddToWatch: EventEmitter<void> = new EventEmitter<void>();

  addToWatch(ev: Event) {
    ev.stopPropagation();
    this.onAddToWatch.emit();
  }

}
