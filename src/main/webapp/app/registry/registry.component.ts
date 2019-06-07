import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { GetJsonDataService } from 'app/registry/registry.service';
import { v4 } from 'uuid';
import { DynamicDataSource, DynamicFlatNode } from './registry.dynamicData.service';

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
    objectKeys = Object.keys;
    // treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
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

    // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    displayedColumns: string[];
    tableData;

    // constructor(private jsonService: GetJsonDataService, public dialog: MatDialog, private modalService: NgbModal) {}
    constructor(private jsonService: GetJsonDataService, private modalService: NgbModal) {
        this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new DynamicDataSource(this.treeControl, jsonService);

        jsonService.getNodes();
        jsonService.getActiveNode().subscribe(dataToDisplay => {
            if (dataToDisplay && dataToDisplay.length > 0) {
                this.tableData = new MatTableDataSource(dataToDisplay);
                setTimeout(() => {
                    this.tableData.sort = this.sort;
                    this.tableData.paginator = this.pager;
                }, 0);
            } else {
                this.tableData = null;
            }
        });

        this.dataSource.data = jsonService.initialData();
    }

    treeControl: FlatTreeControl<DynamicFlatNode>;

    dataSource: DynamicDataSource;

    getLevel = (node: DynamicFlatNode) => {
        return node.level;
    };

    isExpandable = (node: DynamicFlatNode) => {
        return node.expandable;
    };

    hasChild = (_: number, _nodeData: DynamicFlatNode) => {
        return _nodeData.expandable;
    };
    // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngOnInit() {
        // this.jsonService.fetchData('root').subscribe(x => {
        // this.dataSource.data = x;
        // });
        this.displayedColumns = ['name', 'type', 'value', 'default', 'description', 'action'];
    }

    deepCopy(data): any {
        return JSON.parse(JSON.stringify(data));
    }

    loadData(name) {
        // this will be emliminated once we set value with node and set data directly
        /*  this.loadMoreNode(name);
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
        } */
    }

    loadMoreNode(name) {
        /*this.jsonService.fetchData(name).subscribe(x => {
            console.log(' x ', x);
            console.log(' (JSON.stringify(this.dataSource.data) === JSON.stringify(x)) ', (JSON.stringify(this.dataSource.data) === JSON.stringify(x)));
            // if(!(JSON.stringify(this.dataSource.data) === JSON.stringify(x))){
                // this.dataSource.data = null;
                this.dataSource.data = x;
            // }
        });*/
    }

    loadTable(data) {
        /*  data.forEach(item => {
            if (!item.id) {
                item.id = v4();
            }
        });
        this.tableData = new MatTableDataSource(data);
        setTimeout(() => {
            this.tableData.sort = this.sort;
            this.tableData.paginator = this.pager;
        }, 0); */
    }

    logNode(selectedNode) {
        /* this.activeNode = selectedNode;
        const data = this.loadData(selectedNode.name);
        if (!data) {
            this.tableData = null;
            return;
        }
        this.loadTable(data);
        */
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
        /* this.deleteEle = element;
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
        ); */
    }

    open(content, element) {
        /* if (element) {
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
        ); */
    }

    private getDismissReason(reason: any) {
        /*  if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        } */
    }
}
