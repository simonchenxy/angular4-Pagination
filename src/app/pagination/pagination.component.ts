import { Component, Input, Output, OnInit, DoCheck, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit, DoCheck {
    currentPage = 1;
    currentCount = 5;
    oldCount: number;
    btnNum = 5;
    pageNumArray: Array<number>;
    pageFullNumArray: Array<number>;
    countArray = [5, 10, 20];
    @Input() leng: number;
    @Output() pageCurrent = new EventEmitter<number>();
    @Output() countCurrent = new EventEmitter<number>();

    ngOnInit() {
        this.setPageNum();
        this.emitCurrentPage();
        this.emitCurrentCount();
    }
    ngDoCheck() {
        if (this.currentCount !== this.oldCount) {
            this.setPageNum();
            this.currentPage = 1;
            this.emitCurrentPage();
            this.emitCurrentCount();
            this.oldCount = this.currentCount;
        }
    }
    setPageNum() {
        this.pageNumArray = [];
        this.pageFullNumArray = [];
        const num = this.leng / this.currentCount;
        for (let i = 0; i < num; i++) {
            this.pageFullNumArray.push(i + 1);
        }
        if (this.pageFullNumArray.length > this.btnNum) {
            for (let i = 0; i < this.btnNum; i++) {
                this.pageNumArray.push(i + 1);
            }
        } else {
            this.pageNumArray = this.pageFullNumArray;
        }
    }
    getCount() {
        console.log('start');
        console.log('count = ' + this.currentCount);
        console.log('old count = ' + this.oldCount);
        this.emitCurrentCount();
        console.log('end');

    }
    getCurrentPage(page: number) {
        if (page > this.currentPage && this.pageNumArray.indexOf(page) > 2) {
            this.plus();
        }
        if (page < this.currentPage && this.pageNumArray.indexOf(page) < 2) {
            this.minus();
        }
        this.currentPage = page;
        this.emitCurrentPage();
    }
    next() {
        if (this.pageNumArray.indexOf(this.currentPage) > 1) {
            this.plus();
        }
        if (this.currentPage === this.pageFullNumArray[this.pageFullNumArray.length - 1]) {
            return;
        } else {
            this.currentPage += 1;
        }
        this.emitCurrentPage();
    }
    prev() {
        if (this.pageNumArray.indexOf(this.currentPage) < this.pageNumArray.length - 2) {
            this.minus();
        }
        if (this.currentPage === 1) {
            return;
        } else {
            this.currentPage -= 1;
        }
        this.emitCurrentPage();
    }
    plus() {
        if (this.pageNumArray[this.pageNumArray.length - 1] < this.pageFullNumArray[this.pageFullNumArray.length - 1]) {
            for (let i = 0; i < this.btnNum; i++) {
                this.pageNumArray[i] += 1;
            }
        }
    }
    minus() {
        if (this.pageNumArray[0] > 1) {
            for (let i = 0; i < this.btnNum; i++) {
                this.pageNumArray[i] -= 1;
            }
        }
    }
    emitCurrentPage() {
        this.pageCurrent.emit(this.currentPage);
    }
    emitCurrentCount() {
        this.countCurrent.emit(this.currentCount);
    }
}
