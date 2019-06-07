import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import * as _ from 'lodash';
import { element, createLNodeObject } from '@angular/core/src/render3/instructions';
import { deepEqual } from 'assert';
import { DynamicFlatNode } from './registry.dynamicData.service';
import { Subject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GetJsonDataService {
    // localUrl = 'assets/data.json';
    resultMap = [];
    rootLevelNodes = [];
    dataMap = new Map();
    subject = new Subject<any[]>();
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
    rootNodeJson = [
        [
            {
                name: 'R66',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\R66\\\\'
            },
            {
                name: 'RegEdit',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\RegEdit\\\\'
            },
            {
                name: 'SSX',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\'
            }
        ],
        []
    ];

    r66NodeJson = [
        [
            {
                name: 'AutoJetRecovery',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\R66\\\\AutoJetRecovery\\\\'
            },
            {
                name: 'Debug',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\R66\\\\Debug\\\\'
            },
            {
                name: 'Persist',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Solidscape\\\\R66\\\\Persist\\\\'
            }
        ],
        [
            {
                name: 'previousJobState',
                type: 'dword',
                value: 1,
                default: '0',
                description: 'Prior job state when going into StandBy'
            },
            {
                name: 'tempSetbackEnable',
                type: 'dword',
                value: 2,
                default: '1',
                description: ''
            },
            {
                name: 'timeStampStr',
                type: 'string',
                value: '201904190440',
                default: '123456789012',
                description: ''
            },
            {
                name: 'plotterSize_Y',
                type: 'string',
                value: '7.281',
                default: '7.300000',
                description: ''
            },
            {
                name: 'CoolingWarmEnvThresholdDegreesC',
                type: 'string',
                value: '30.',
                default: '30.000000',
                description: ''
            },
            {
                name: 'cutterPickupPos_Y',
                type: 'string',
                value: '2.982000113',
                default: '2.982000',
                description: ''
            },
            {
                name: 'previousState',
                type: 'dword',
                value: 3,
                default: '3',
                description: 'Prior state when going into StandBy'
            },
            {
                name: 'capExtractorBumpXPosition_Build',
                type: 'string',
                value: '10.5934',
                default: '10.625000',
                description: ''
            },
            {
                name: 'capExtractorBumpXPosition_Support',
                type: 'string',
                value: '10.59119987',
                default: '10.625000',
                description: ''
            },
            {
                name: 'ceAccumAtStartOfJob',
                type: 'dword',
                value: 3,
                default: '',
                description: ''
            },
            {
                name: 'jetCheckPostFailures_PHC_0_Build',
                type: 'dword',
                value: 0,
                default: '0',
                description: ''
            },
            {
                name: 'VoltsPerMgHighSupport',
                type: 'string',
                value: '0.2109999955',
                default: '',
                description: ''
            },
            {
                name: 'VoltsPerMgLowSupport',
                type: 'string',
                value: '0.3230000138',
                default: '',
                description: ''
            },
            {
                name: 'VoltsPerMgHighBuild',
                type: 'string',
                value: '0.2329999954',
                default: '',
                description: ''
            },
            {
                name: 'VoltsPerMgLowBuild',
                type: 'string',
                value: '0.1640000045',
                default: '',
                description: ''
            },
            {
                name: 'chipWeightDropMassHiVol_Support',
                type: 'dword',
                value: 4200,
                default: '3232',
                description: ''
            },
            {
                name: 'chipWeightDropMassHiVol_Build',
                type: 'dword',
                value: 7066,
                default: '7066',
                description: ''
            },
            {
                name: 'tightenPaperTape',
                type: 'string',
                value: '0.5',
                default: '',
                description: ''
            },
            {
                name: 'cutterExtraOvertravel_X',
                type: 'string',
                value: '0.',
                default: '0.000000',
                description: 'This provides additional profile cutter travel, in inches, toward the right'
            },
            {
                name: 'defaultVel',
                type: 'string',
                value: '10.',
                default: '',
                description: ''
            },
            {
                name: 'defaultAcc',
                type: 'string',
                value: '289.6000061',
                default: '',
                description: ''
            },
            {
                name: 'tapInPlaceDepthOffset',
                type: 'dword',
                value: 500,
                default: '',
                description: ''
            },
            {
                name: 'capExtractorYBackoffOffset',
                type: 'string',
                value: '0.',
                default: '',
                description: ''
            },
            {
                name: 'capExtractorBumpXPositionMin_Support',
                type: 'string',
                value: '10.5',
                default: '',
                description: ''
            },
            {
                name: 'capExtractorBumpXPositionMin_Build',
                type: 'string',
                value: '10.5',
                default: '',
                description: ''
            },
            {
                name: 'NewSptJetSetupHasRun',
                type: 'dword',
                value: 1,
                default: 'true',
                description: ''
            },
            {
                name: 'NewBldJetSetupHasRun',
                type: 'dword',
                value: 1,
                default: 'true',
                description: ''
            },
            {
                name: 'NewJetSetupRequiredOverride',
                type: 'dword',
                value: 0,
                default: 'false',
                description: 'Overrides jet-setup-required condition allowing jet-functions and job-start w/o completing jet-setup.'
            },
            {
                name: 'purgeMaxTime_Support',
                type: 'dword',
                value: 8,
                default: '3',
                description: ''
            },
            {
                name: 'purgeMaxTime_Build',
                type: 'dword',
                value: 8,
                default: '3',
                description: ''
            },
            {
                name: 'numHomeTableOps',
                type: 'dword',
                value: 3,
                default: '3',
                description: ''
            },
            {
                name: 'tempRampSupportJetHoldTimeSec',
                type: 'dword',
                value: 600,
                default: '',
                description: ''
            },
            {
                name: 'tempRampBuildJetHoldTimeSec',
                type: 'dword',
                value: 600,
                default: '',
                description: ''
            },
            {
                name: 'chipWeightDropMassHiVolDefault_Support',
                type: 'dword',
                value: 3232,
                default: '3232',
                description: ''
            },
            {
                name: 'chipWeightDropMassLoVolDefault_Support',
                type: 'dword',
                value: 3513,
                default: '3513',
                description: ''
            },
            {
                name: 'mgPerCountMax',
                type: 'string',
                value: '0.5',
                default: '0.5',
                description: 'MDS calibration, maximum mgPerCount acceptable'
            },
            {
                name: 'mgPerCountMin',
                type: 'string',
                value: '1.e-002',
                default: '0.01',
                description: 'MDS calibration, minimum mgPerCount acceptable'
            },
            {
                name: 'chipWeightDropMassHiVolDefault_Build',
                type: 'dword',
                value: 7066,
                default: '7066',
                description: ''
            },
            {
                name: 'chipWeightDropMassLoVolDefault_Build',
                type: 'dword',
                value: 5750,
                default: '5750',
                description: ''
            },
            {
                name: 'smartCalTimeSpan_hours',
                type: 'dword',
                value: 36,
                default: '120',
                description: 'Maximum time span in between successful volume calibrations.'
            },
            {
                name: 'purgeTubeWiperEnable',
                type: 'dword',
                value: 1,
                default: 'false',
                description: ''
            },
            {
                name: 'purgeTubeWipePos_Support_Y',
                type: 'string',
                value: '3.748',
                default: '3.770000',
                description: ''
            },
            {
                name: 'purgeTubeWipePos_Support_X',
                type: 'string',
                value: '10.645',
                default: '10.620000',
                description: ''
            },
            {
                name: 'purgeTubeWipePos_Build_Y',
                type: 'string',
                value: '5.623',
                default: '5.638000',
                description: ''
            },
            {
                name: 'purgeTubeWipePos_Build_X',
                type: 'string',
                value: '10.645',
                default: '10.620000',
                description: ''
            },
            {
                name: 'purgePos_Y',
                type: 'string',
                value: '4.710',
                default: '4.710000',
                description: ''
            },
            {
                name: 'purgePos_X',
                type: 'string',
                value: '10.280',
                default: '10.280000',
                description: ''
            },
            {
                name: 'opticsTestPrePos_X',
                type: 'string',
                value: '8.25',
                default: '8.250000',
                description: ''
            },
            {
                name: 'jetTestPitch_Support',
                type: 'string',
                value: '0.0010',
                default: '0.000500',
                description: ''
            },
            {
                name: 'extractorBackoffDistance',
                type: 'string',
                value: '0.025',
                default: '0.020000',
                description: ''
            },
            {
                name: 'PrepJetMultiCheckNum',
                type: 'dword',
                value: 3,
                default: '3',
                description: 'The number of jet checks done as part of the jet preparation at the start of a job'
            },
            {
                name: 'volCalModelChickletPrintMode',
                type: 'dword',
                value: 0,
                default: '0',
                description: ''
            },
            {
                name: 'activeCoolingExtraSeconds',
                type: 'string',
                value: '30.',
                default: '30.000000',
                description: ''
            },
            {
                name: 'activeCoolingFanRadius',
                type: 'string',
                value: '1.149999976',
                default: '1.150000',
                description: ''
            },
            {
                name: 'activeCoolingXOffsetFromCutter',
                type: 'string',
                value: '1.980999947',
                default: '1.981000',
                description: ''
            },
            {
                name: 'activeCoolingTableOffset',
                type: 'string',
                value: '0.25',
                default: '0.250000',
                description: ''
            },
            {
                name: 'activeCoolingEnable',
                type: 'dword',
                value: 0,
                default: 'false',
                description: ''
            },
            {
                name: 'millForwardOnly',
                type: 'dword',
                value: 0,
                default: 'false',
                description: ''
            },
            {
                name: 'millPasses',
                type: 'dword',
                value: 4,
                default: '4',
                description: ''
            },
            {
                name: 'useTestJets',
                type: 'dword',
                value: 1,
                default: 'true',
                description: ''
            },
            {
                name: 'swapModelFileJets',
                type: 'dword',
                value: 0,
                default: 'false',
                description: ''
            },
            {
                name: 'avoidMDSIntPos2_Y',
                type: 'dword',
                value: 25000,
                default: '25000',
                description: ''
            },
            {
                name: 'avoidMDSIntPos2_X',
                type: 'dword',
                value: 30000,
                default: '30000',
                description: ''
            },
            {
                name: 'avoidMDSIntPos1_Y',
                type: 'dword',
                value: 25000,
                default: '25000',
                description: ''
            },
            {
                name: 'avoidMDSIntPos1_X',
                type: 'dword',
                value: 47500,
                default: '47500',
                description: ''
            },
            {
                name: 'avoidMDSMax',
                type: 'string',
                value: '6.',
                default: '6.000000',
                description: ''
            },
            {
                name: 'avoidMDSMin',
                type: 'string',
                value: '6.',
                default: '6.000000',
                description: ''
            },
            {
                name: 'paperLevelDuringWipeMinTicks',
                type: 'dword',
                value: 3600000,
                default: '3600000',
                description: ''
            },
            {
                name: 'testMoveVel',
                type: 'dword',
                value: 50,
                default: '50',
                description: ''
            },
            {
                name: 'testMoveAcc',
                type: 'dword',
                value: 1448,
                default: '1448',
                description: ''
            },
            {
                name: 'testMovePitch',
                type: 'dword',
                value: 4,
                default: '4',
                description: ''
            },
            {
                name: 'NewJetUsageExtraWaitTimeLong_Sec',
                type: 'dword',
                value: 1800,
                default: '1800',
                description: ''
            },
            {
                name: 'NewJetUsageExtraWaitTimeShort_Sec',
                type: 'dword',
                value: 1,
                default: '1',
                description: ''
            },
            {
                name: 'NewJetUsageExtraWaitTime_Sec',
                type: 'dword',
                value: 60,
                default: '60',
                description: ''
            },
            { name: 'NewJetUsageWaitTime_Sec', type: 'dword', value: 3600, default: '', description: '' },
            { name: 'fastVel', type: 'string', value: '5.', default: '5.000000', description: '' },
            { name: '7747StableCountAllowedError', type: 'dword', value: 4, default: '4', description: '' },
            {
                name: 'mgPerCountDeltaMax',
                type: 'string',
                value: '2.e-003',
                default: '0.002',
                description: 'MDS calibration, largest mgPerCount delta acceptable for consecutive reads'
            }
        ]
    ];

    ssxNodeJson = [
        [
            {
                name: 'StatusServer',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\StatusServer\\\\'
            },
            {
                name: 'Register',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Register\\\\'
            },
            {
                name: 'VolCalHistory',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\VolCalHistory\\\\'
            },
            {
                name: 'PressureTankLevelMgr',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\PressureTankLevelMgr\\\\'
            },
            {
                name: 'VolumeCalManager',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\VolumeCalManager\\\\'
            },
            {
                name: 'EPP',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\EPP\\\\'
            },
            {
                name: 'MaterialTracker',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\MaterialTracker\\\\'
            },
            {
                name: 'MaterialDelivery',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\MaterialDelivery\\\\'
            },
            {
                name: 'FanMgr',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\FanMgr\\\\'
            },
            {
                name: 'ContactCal',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\ContactCal\\\\'
            },
            {
                name: 'Logger',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Logger\\\\'
            },
            {
                name: 'StatusWatch',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\StatusWatch\\\\'
            },
            {
                name: 'Table',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Table\\\\'
            },
            {
                name: 'SCI',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\SCI\\\\'
            },
            {
                name: 'EEProm',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\EEProm\\\\'
            },
            {
                name: 'Tanks',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Tanks\\\\'
            },
            {
                name: 'Carriage',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Carriage\\\\'
            },
            {
                name: 'Jets',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Jets\\\\'
            },
            {
                name: 'CapSensor',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\CapSensor\\\\'
            },
            {
                name: 'Heaters',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Heaters\\\\'
            },
            {
                name: 'Faults',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Faults\\\\'
            },
            {
                name: 'Connections',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Connections\\\\'
            },
            {
                name: 'Papertape',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Papertape\\\\'
            },
            {
                name: 'Stepper',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Stepper\\\\'
            },
            {
                name: 'Ports',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Ports\\\\'
            },
            {
                name: 'Controller',
                key: '\\\\\\\\HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\VPL\\\\SSX\\\\Controller\\\\'
            }
        ],
        [
            {
                name: 'checkNetworkStatus',
                type: 'dword',
                value: 0,
                default: '',
                description: ''
            },
            {
                name: 'acPumpInstalled',
                type: 'dword',
                value: 1,
                default: '',
                description: ''
            },
            {
                name: 'watchdogTimeoutMS',
                type: 'dword',
                value: 180000,
                default: '',
                description: ''
            },
            {
                name: 'enableRegistryDocGeneration',
                type: 'dword',
                value: 0,
                default: 'false',
                description: ''
            },
            {
                name: 'watchdogEnable',
                type: 'dword',
                value: 1,
                default: '',
                description: ''
            },
            {
                name: 'spiClockPrescale',
                type: 'dword',
                value: 2,
                default: '',
                description: ''
            },
            {
                name: 'spiAddrDataDelayCount',
                type: 'dword',
                value: 40,
                default: '',
                description: ''
            },
            {
                name: 'restartNetwork',
                type: 'dword',
                value: 0,
                default: 'false',
                description: ''
            },
            {
                name: 'restartExecutive',
                type: 'dword',
                value: 0,
                default: '',
                description: ''
            },
            {
                name: 'LocalGUI',
                type: 'dword',
                value: 1,
                default: 'true',
                description: ''
            },
            {
                name: 'heaterOffUntilHomedTemp_Support',
                type: 'dword',
                value: 100,
                default: '',
                description: ''
            },
            {
                name: 'heaterOffUntilHomedTemp_Build',
                type: 'dword',
                value: 100,
                default: '',
                description: ''
            },
            {
                name: 'EZPrinterTank',
                type: 'dword',
                value: 1,
                default: '',
                description: ''
            },
            {
                name: 'enableRegistryNameGeneration',
                type: 'dword',
                value: 0,
                default: 'false',
                description: ''
            },
            {
                name: 'Prefix',
                type: 'string',
                value: 'SSX',
                default: '',
                description: ''
            },
            {
                name: 'DoStartProcess2',
                type: 'dword',
                value: 1,
                default: '',
                description: ''
            },
            {
                name: 'DoSilentInstall',
                type: 'dword',
                value: 0,
                default: '',
                description: ''
            },
            {
                name: 'DLL',
                type: 'string',
                value: '\\\\Hard Disk\\\\SSXDrv3.Dll',
                default: '',
                description: ''
            },
            {
                name: 'BatDetectDelaySeconds',
                type: 'dword',
                value: 5,
                default: '',
                description: ''
            },
            {
                name: 'AutoStartProcessToStart2',
                type: 'string',
                value: '\\\\hard disk\\\\remotediag.exe',
                default: '',
                description: ''
            },
            {
                name: 'AutoStartProcessToStart',
                type: 'string',
                value: '\\\\hard disk\\\\system\\\\SSXControl.exe',
                default: '',
                description: ''
            },
            {
                name: 'AutoStartMinDelaySeconds',
                type: 'dword',
                value: 0,
                default: '',
                description: ''
            },
            {
                name: 'AutoStartDelaySeconds',
                type: 'dword',
                value: 10,
                default: '',
                description: ''
            }
        ]
    ];

    NODE_DATA = {
        root: this.rootNodeJson,
        r66: this.r66NodeJson,
        ssx: this.ssxNodeJson
    };

    NODE_TABLE_DATA = {};
    arrangeChildNodes(nodes) {
        nodes.forEach((node, ind) => {
            if (!(ind === nodes.length - 1)) {
                if (this.dataMap.has(node)) {
                    const previousValues = this.dataMap.get(node);
                    if (!previousValues.includes(nodes[ind + 1])) {
                        this.dataMap.set(node, [...previousValues, nodes[ind + 1]]);
                    }
                } else {
                    this.dataMap.set(node, [nodes[ind + 1]]);
                }
            }
        });
    }

    getNodes() {
        for (let i in this.NODE_DATA) {
            this.NODE_DATA[i][0].forEach(item => {
                let nodes = item.key
                    .replace(/\\\\/g, ' ')
                    .split(' ')
                    .filter(Boolean);
                if (!this.rootLevelNodes.includes(nodes[0])) {
                    this.rootLevelNodes.push(nodes[0]);
                }
                this.arrangeChildNodes(nodes);
            });
            this.NODE_TABLE_DATA[i] = this.NODE_DATA[i][1];
        }
    }

    initialData(): DynamicFlatNode[] {
        return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
    }

    getChildren(node: string): string[] | undefined {
        return this.dataMap.get(node);
    }

    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }

    setActiveNode(nodeName) {
        if (!this.NODE_TABLE_DATA[nodeName.toLowerCase()]) {
            this.subject.next([]);
        } else {
            this.subject.next(this.NODE_TABLE_DATA[nodeName.toLowerCase()]);
        }
    }

    getActiveNode(): Observable<any[]> {
        return this.subject.asObservable();
    }
}
