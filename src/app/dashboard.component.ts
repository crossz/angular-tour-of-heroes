import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  // Insert IFrame URL
  url = 'http://localhost:4200/assets/html/index.html';
  ComponentUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private heroService: HeroService,
    
    // Insert IFrame URL
    private sanitizer: DomSanitizer
    
    ) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));

    // Insert IFrame URL
    this.ComponentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)

  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
