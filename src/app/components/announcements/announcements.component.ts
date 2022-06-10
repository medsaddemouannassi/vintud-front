import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from '../../services/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: any = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

}
