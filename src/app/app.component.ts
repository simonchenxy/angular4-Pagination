import { Component, DoCheck } from '@angular/core';
import { Data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  datas = Data(40);
  dataShow: Array<number>;
  leng = this.datas.length;
  currentPage: number;
  oldPage: number;
  currentCount: number;
  oldCount: number;
  constructor() {
    console.log(this.leng);
  }
  ngDoCheck() {
    if (this.currentPage !== this.oldPage || this.currentCount !== this.oldCount) {
      this.dataShow = [];
      const currentPage = this.currentPage - 1;
      const pages = this.currentCount;
      let show = currentPage * pages;
      for (let i = 0; i < pages; i++ , show++) {
        if (this.datas[show] == null) {
          break;
        }
        this.dataShow.push(this.datas[show]);
      }
      this.oldPage = this.currentPage;
      this.oldCount = this.currentCount;
    }
  }


  getCurrentPage(page: number) {
    this.currentPage = page;
  }
  getCurrentCount(page: number) {
    this.currentCount = page;
  }
}
