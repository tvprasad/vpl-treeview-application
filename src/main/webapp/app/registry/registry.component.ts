import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { GetJsonDataService } from 'app/registry/registry.service';
import { v4 } from 'uuid';

export interface TreeViewStructure {
    name: string;
    children?: TreeViewStructure[];
}

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

interface RowData {
    id?: string;
    fname: string;
    fdate: string;
    ftype: string;
    fsize: string;
    ldate: string;
    lsize: string;
}

@Component({
    selector: 'jhi-registry',
    templateUrl: './registry.component.html',
    styleUrls: ['registry.scss']
})
export class RegistryComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) pager: MatPaginator;
    activeNode = { name: '' };
    modalData: RowData = null;
    deleteEle: RowData = null;
    editMode: boolean;
    closeResult: string;
    HardDisk = [
        {
            fname: 'sn.bin',
            fdate: '2019-04-05 182930',
            ftype: '0',
            fsize: '4',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'Heater.exe',
            fdate: '2019-03-07 191146',
            ftype: '0',
            fsize: '36352',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'RDWD.exe',
            fdate: '2019-03-07 191146',
            ftype: '0',
            fsize: '3584',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'registry.txt',
            fdate: '2019-03-11 011122',
            ftype: '0',
            fsize: '98182',
            ldate: '2019-03-11 011122',
            lsize: 98182
        },
        {
            fname: 'PSIDrv3.dll',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '199168',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'PSIRegEdit.exe',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '46592',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'StartPSI.exe',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '44032',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'NetworkTestResults.txt',
            fdate: '2019-01-09 130556',
            ftype: '0',
            fsize: '1074',
            ldate: '2019-01-09 130556',
            lsize: 1074
        },
        {
            fname: 's3c6410_iic.dll',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '11776',
            ldate: '',
            lsize: ''
        },
        {
            fname: 's3c6410_sci.dll',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '52224',
            ldate: '',
            lsize: ''
        },
        {
            fname: 's3c6410_sci_p3.dll',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '20992',
            ldate: '',
            lsize: ''
        },
        {
            fname: 's3c6410_sci_3640.dll',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '50688',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'RemoteDiag.exe',
            fdate: '2019-03-07 191328',
            ftype: '0',
            fsize: '75264',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Core.dll',
            fdate: '2019-01-10 085758',
            ftype: '0',
            fsize: '38424',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Data.DataSetExtensions.dll',
            fdate: '2019-01-10 085758',
            ftype: '0',
            fsize: '16960',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Data.dll',
            fdate: '2019-01-10 085800',
            ftype: '0',
            fsize: '124440',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Xml.Linq.dll',
            fdate: '2019-01-10 085800',
            ftype: '0',
            fsize: '38432',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Xml.dll',
            fdate: '2019-01-10 085800',
            ftype: '0',
            fsize: '103960',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.dll',
            fdate: '2019-01-10 085800',
            ftype: '0',
            fsize: '112144',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'mscorlib.dll',
            fdate: '2019-01-10 085800',
            ftype: '0',
            fsize: '214552',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'Documents and Settings',
            fdate: '1971-01-09 095216',
            ftype: '16',
            fsize: '0',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'Jobs',
            fdate: '2018-06-27 071802',
            ftype: '16',
            fsize: '0',
            ldate: '2019-03-28 091943',
            lsize: 4096
        },
        {
            fname: 'Remote',
            fdate: '2018-06-27 071802',
            ftype: '16',
            fsize: '0',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System',
            fdate: '2018-06-27 071802',
            ftype: '16',
            fsize: '0',
            ldate: '',
            lsize: ''
        }
    ];
    Remote = [
        {
            fname: 'LogServerR.exe',
            fdate: '2019-03-07 191150',
            ftype: '0',
            fsize: '73216',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'PatrickSysRemote.exe',
            fdate: '2019-03-07 191328',
            ftype: '0',
            fsize: '6641152',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Core.dll',
            fdate: '2019-01-10 085642',
            ftype: '0',
            fsize: '38424',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Data.DataSetExtensions.dll',
            fdate: '2019-01-10 085642',
            ftype: '0',
            fsize: '16960',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Xml.Linq.dll',
            fdate: '2019-01-10 085644',
            ftype: '0',
            fsize: '38432',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Data.dll',
            fdate: '2019-01-10 085644',
            ftype: '0',
            fsize: '124440',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Drawing.dll',
            fdate: '2019-01-10 085644',
            ftype: '0',
            fsize: '46624',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Windows.Forms.dll',
            fdate: '2019-01-10 085644',
            ftype: '0',
            fsize: '103984',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.Xml.dll',
            fdate: '2019-01-10 085644',
            ftype: '0',
            fsize: '103960',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.dll',
            fdate: '2019-01-10 085644',
            ftype: '0',
            fsize: '112144',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'mscorlib.dll',
            fdate: '2019-01-10 085646',
            ftype: '0',
            fsize: '214552',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'EZPGUIR.exe',
            fdate: '2019-03-07 191328',
            ftype: '0',
            fsize: '6641152',
            ldate: '',
            lsize: ''
        }
    ];
    Jobs = [
        {
            fname: 'SpiCamera.exe',
            fdate: '2019-03-07 191340',
            ftype: '0',
            fsize: '494592',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'newSystem.REG',
            fdate: '2019-03-07 191148',
            ftype: '0',
            fsize: '27817',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'FullPaperBG.bmp',
            fdate: '2019-04-11 233758',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'corner_1.bmp',
            fdate: '2019-04-11 233856',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'corner_2.bmp',
            fdate: '2019-04-11 233928',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'stepper_0.csv',
            fdate: '2019-04-11 234042',
            ftype: '0',
            fsize: '10724',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'papertape_roll_adjust_1.bmp',
            fdate: '2019-04-11 233942',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'papertape_roll_adjust_2.bmp',
            fdate: '2019-04-11 233946',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'papertape_roll_1.bmp',
            fdate: '2019-04-11 234000',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'papertape_roll_2.bmp',
            fdate: '2019-04-11 234000',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'stepper_1.csv',
            fdate: '2018-07-05 080230',
            ftype: '0',
            fsize: '8469',
            ldate: '',
            lsize: ''
        },
        {
            fname: '201807191524_Short_Cube.JobStats.txt',
            fdate: '2018-07-19 131926',
            ftype: '0',
            fsize: '3074',
            ldate: '2018-07-19 131926',
            lsize: 3074
        },
        {
            fname: 'grid.bmp',
            fdate: '2019-01-25 035014',
            ftype: '0',
            fsize: '308278',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'current_job.csv',
            fdate: '2019-01-25 040948',
            ftype: '0',
            fsize: '74',
            ldate: '',
            lsize: ''
        },
        {
            fname: '223402151047_PatrickSys_Logo_Metric.JobStats.txt',
            fdate: '2019-01-04 040702',
            ftype: '0',
            fsize: '3223',
            ldate: '2019-01-04 040702',
            lsize: 3223
        },
        {
            fname: 'facts.clp',
            fdate: '2019-03-11 011118',
            ftype: '0',
            fsize: '1436',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'jobs.csv',
            fdate: '2019-01-25 040156',
            ftype: '0',
            fsize: '337',
            ldate: '',
            lsize: ''
        },
        {
            fname: '201901101335_PatrickSys_Logo_Metric.JobStats.txt',
            fdate: '2019-01-10 092318',
            ftype: '0',
            fsize: '3204',
            ldate: '2019-01-10 092318',
            lsize: 3204
        },
        {
            fname: '201901122012_PatrickSys_Logo_Metric.JobStats.txt',
            fdate: '2019-01-12 155718',
            ftype: '0',
            fsize: '3171',
            ldate: '2019-01-12 155718',
            lsize: 3171
        },
        {
            fname: '201901250827_Short_Cube.JobStats.txt',
            fdate: '2019-01-25 041828',
            ftype: '0',
            fsize: '3071',
            ldate: '2019-01-25 041828',
            lsize: 3071
        },
        {
            fname: '201808230935_Short_Cube.JobStats-HelloPrasad12.txt',
            fdate: '2018-08-23 065806',
            ftype: '0',
            fsize: '3423',
            ldate: '',
            lsize: ''
        }
    ];
    DocAndSettings = [
        {
            fname: 'system.hv',
            fdate: '2019-04-12 001042',
            ftype: '0',
            fsize: '446664',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'default.vol',
            fdate: '2019-04-11 233522',
            ftype: '0',
            fsize: '118824',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'default.mky',
            fdate: '1971-01-09 095216',
            ftype: '0',
            fsize: '52',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'System.mky',
            fdate: '2014-10-30 072834',
            ftype: '0',
            fsize: '52',
            ldate: '',
            lsize: ''
        },
        {
            fname: 'default',
            fdate: '1971-01-09 095216',
            ftype: '16',
            fsize: '0',
            ldate: '',
            lsize: ''
        }
    ];

    objectKeys = Object.keys;
    treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(
        (node: TreeViewStructure, level: number) => {
            return {
                expandable: !!node.children && node.children.length > 0,
                name: node.name,
                level
            };
        },
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    displayedColumns: string[];
    tableData;

    constructor(private jsonService: GetJsonDataService, public dialog: MatDialog, private modalService: NgbModal) {}

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit() {
        this.jsonService.fetchData().subscribe(x => {
            this.dataSource.data = x;
        });
        this.displayedColumns = ['fname', 'fdate', 'ftype', 'fsize', 'ldate', 'lsize', 'action'];
    }

    deepCopy(data): any {
        return JSON.parse(JSON.stringify(data));
    }

    loadData(name) {
        // this will be emliminated once we set value with node and set data directly
        switch (name) {
            case 'Hard Disk':
                return this.HardDisk;
            case 'Remote':
                return this.Remote;
            case 'Jobs':
                return this.Jobs;
            case 'Documents and Settings':
                return this.DocAndSettings;
            default:
                return null;
        }
    }

    loadTable(data) {
        data.forEach(item => {
            if (!item.id) {
                item.id = v4();
            }
        });
        this.tableData = new MatTableDataSource(data);
        setTimeout(() => {
            this.tableData.sort = this.sort;
            this.tableData.paginator = this.pager;
        }, 0);
    }

    logNode(selectedNode) {
        this.activeNode = selectedNode;
        const data = this.loadData(selectedNode.name);
        if (!data) {
            this.tableData = null;
            return;
        }
        this.loadTable(data);

        //     if (selectedNode.name === 'Hard Disk') {
        //     this.tableData = new MatTableDataSource(this.HardDisk);
        // } else {
        //     this.tableData = null;
        // }
    }

    applyFilter(filterValue: string) {
        this.tableData.filter = filterValue.trim().toLowerCase();
    }

    delete(content, element) {
        this.deleteEle = element;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(
            result => {
                const data = this.loadData(this.activeNode.name);
                const index = data.findIndex(item => item.fname === element.fname);
                data.splice(index, 1);
                this.loadTable(data);
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    open(content, element) {
        if (element) {
            if (element.fdate) {
                const date = element.fdate.split(' ')[0];
                // let time = element.fdate.split(' ')[1];
                // time = time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4, 6);
                element.fdate = date;
            }
            if (element.ldate) {
                const date = element.ldate.split(' ')[0];
                element.ldate = date;
            }
            this.modalData = this.deepCopy(element);
        } else {
            this.modalData = {} as RowData;
        }

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
            result => {
                const data = this.loadData(this.activeNode.name);
                if (element && element.id) {
                    const index = data.findIndex(item => item.id === element.id);
                    data.splice(index, 1, this.modalData);
                } else {
                    data.unshift(this.modalData);
                }
                this.loadTable(data);
                this.modalData = null;
                // this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.modalData = null;
                // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
