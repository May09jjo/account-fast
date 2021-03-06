import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthFireService } from '../../../auth-fire.service';


@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;

    public urlProfile: string;

    constructor(public router: Router, private translate: TranslateService,
      public authfire: AuthFireService) {
            /* en 1800 es valor anterior es 992 */
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });

       /*  if (this.authfire.afsAuth.user) {
          this.urlProfile = this.authfire.afsAuth.auth.currentUser.photoURL;
        } else {
          this.urlProfile = 'https://via.placeholder.com/400x400';
        } */
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
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
