import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MenubarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  menuItems: MenuItem[] = [{label: 'Home', routerLink: '/'}, {label: 'Watch later', routerLink: '/watchlist'}];

}
