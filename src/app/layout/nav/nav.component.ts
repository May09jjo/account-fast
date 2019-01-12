import { Observable } from 'rxjs';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFireService } from 'src/app/auth-fire.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public innerWidth: number;
  public mode: string;
  opened: boolean;
  public showMenu: string;
  public urlProfile: string;


    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
        Breakpoints.Handset
    );
    constructor(private breakpointObserver: BreakpointObserver,
      public router: Router, private translate: TranslateService,
      public authfire: AuthFireService) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth > 992) {
          this.mode = 'side';
      } else {
        this.mode = 'over';
      }
    }

  ngOnInit() {
      this.showMenu = '';
  }

  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
      } else {
          this.showMenu = element;
      }
  }

  onLoggedout() {
    this.authfire.logoutUser();
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
}

changeLang(language: string) {
    this.translate.use(language);
}

}
