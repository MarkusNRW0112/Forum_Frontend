import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadModel } from 'src/app/models/thread-model';
import { SubforumService } from 'src/app/service/subforum.service';

@Component({
  selector: 'app-subview',
  templateUrl: './subview.component.html',
  styleUrls: ['./subview.component.css'],
})
export class SubviewComponent implements OnInit {
  //threads: Array<ThreadModel> = [];
  threads: Array<ThreadModel> = [];
  thr!: ThreadModel;

  constructor(
    private route: ActivatedRoute,
    private subService: SubforumService
  ) {}
  ngOnInit(): void {
    const subName = this.route.snapshot.paramMap.get('subName')!;
    this.subService.getAllThreadBySubforum(subName).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.threads.push(new ThreadModel());

        this.threads[i].threadId    = data[i][0];
        this.threads[i].threadTitle = data[i][1];
        this.threads[i].subforum    = data[i][2];
        this.threads[i].user        = data[i][3];
        this.threads[i].content     = data[i][4];
        this.threads[i].date        = data[i][5];
      }
      //this.threads = data;
      console.log(this.threads);
    });
  }
}
