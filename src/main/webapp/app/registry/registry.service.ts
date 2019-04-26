import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class GetJsonDataService {
    // localUrl = 'assets/data.json';
    data = [
        {
            name: 'Application Data',
            children: [
                {
                    name: 'Application Data'
                }
            ]
        },
        {
            name: 'Hard Disk',
            children: [
                {
                    name: 'Documents and Settings',
                    key: 'Hard DiskDocuments and Settings'
                },
                {
                    name: 'Jobs',
                    key: 'Hard DiskJobs'
                },
                {
                    name: 'Remote',
                    key: 'Hard DiskRemote'
                },
                {
                    name: 'System',
                    key: 'Hard DiskSystem'
                }
            ]
        },
        {
            name: 'My Documents',
            children: [
                {
                    name: 'My Documents'
                }
            ]
        },
        {
            name: 'Network',
            children: [
                {
                    name: 'Network'
                }
            ]
        },
        {
            name: 'Program Files',
            children: [
                {
                    name: 'Program Files'
                }
            ]
        },
        {
            name: 'Recycled',
            children: [
                {
                    name: 'Recycled'
                }
            ]
        },
        {
            name: 'Temp',
            children: [
                {
                    name: 'Temp'
                }
            ]
        },
        {
            name: 'Windows',
            children: [
                {
                    name: 'Windows'
                }
            ]
        }
    ];

    constructor() {}

    fetchData() {
        return of(this.data);
    }
}
