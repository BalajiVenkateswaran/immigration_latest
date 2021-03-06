import { dragula } from '../../../../models/dragula';
import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {ManageAccountPetitionStagesService} from './petitiontypestages.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService } from "ng2-bootstrap-modal";
import {ImmigrationViewPetitionsService} from "../../clients-tab/client-details/petitions/petitions.service";
@Component({
    selector: 'app-manageaccount-petitiontypestages',
    templateUrl: './petitiontypestages.component.html',
    styleUrls: ['./petitiontypestages.component.sass']
})
export class ManageAccountPetitionTypeStagesComponent implements OnInit {


    dragbox;
    setClickedRowstages: Function;
    editStagesList: Function;
    petitionTypes: any[] = [];
    petitionStages: dragula[] = [];
    public deletedlist: any;
    private selectedIdx: any;
    private selectedIdxstage: any;
    addPetitionStages: Function;
    addDeleteBtn: boolean;
    cancelBtn: boolean = false;
    saveBtn: boolean = false;
    cancelPetitionStages: Function;
    savePetitionStages: Function;
    saveOrder: Function;
    updateStages:Function;
    private petitiontypeid: any;
    addStages: boolean;
    saveorder: boolean = false;
    private editCancel: Function;
    private editStages: boolean = false;
    private stageId: string;
    private edittrue: boolean[] = [];
    private selectedPetitionType: any = {};


    constructor(private dragulaService: DragulaService, private manageAccountPetitionStagesService: ManageAccountPetitionStagesService, private appService: AppService, private dialogService: DialogService,
                private immigrationViewPetitionsService: ImmigrationViewPetitionsService) {
        this.setClickedRowstages = function (selectedpetitionstages, index) {
            this.deletetrue = true;
            this.edittrue = true;
            this.selectedIdxstage = index;
            this.deletedlist = selectedpetitionstages;
        }
        this.editStagesList = function (stage) {
            stage['edit'] = true;
        }

        this.addPetitionStages = function (addpetition) {
            this.addDeleteBtn = false;
            this.cancelBtn = true;
            this.saveBtn = true;
            this.addStages = true;
            this.typeadd = addpetition;
            this.addPetionStagesName = "";

        }
        this.cancelPetitionStages = function () {
            this.addStages = false;
            this.addDeleteBtn = true;
            this.cancelBtn = false;
            this.saveBtn = false;
            this.saveorder = false;
            this.typeadd = "";
        }
        this.savePetitionStages = function (petitionstage) {
            this.addDeleteBtn = true;
            this.cancelBtn = false;
            this.saveBtn = false;
            this.addStages = false;
            var petitionname = this.addPetionStagesName;
            var petitionstages = { "accountId": this.appService.user.accountId, "petitionStageName": petitionname, "petitionTypeId": petitionstage[0].petitionTypeId };
            this.manageAccountPetitionStagesService.addPetitionStage(petitionstages).subscribe((res) => {
                if (res.statusCode == "SUCCESS") {
                    this.getpetitionstages();
                }
            });
        }
        this.editCancel=function(stage){
            stage['edit'] = false;
        }
        this.updateStages = function (stage, i) {
            stage['edit'] = false;
            if (this.updatename != undefined){
                stage.name = this.updatename;
            }
            var updatedname = { "accountId": this.appService.user.accountId, "petitionStages": [stage], "petitionTypeId": stage.petitionTypeId};
            this.manageAccountPetitionStagesService.updatePetitionStage(updatedname).subscribe((res) => {
                if (res.statusCode == "SUCCESS") {

                }
            });
        }

        this.saveOrder = function () {

            for (var stageIndex in this.petitionStages) {
              var stage = this.petitionStages[stageIndex];
              stage['orderNo'] = stageIndex;
            }
            var req = {
                petitionStages: this.petitionStages,
                accountId: this.appService.user.accountId,
                petitionTypeId: this.selectedPetitionType['petitionTypeId']
            };

            this.manageAccountPetitionStagesService
                .saveStageOrder(req)
                .subscribe((res: any) => {
                    if (res.statusCode == "SUCCESS") {
                        this.saveorder = false;
                        this.cancelBtn = false;
                        this.addDeleteBtn = true;
                    }
                });

        }
        dragulaService.drag.subscribe((value) => {
            this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
            this.saveorder = true;
            this.cancelBtn = true;
            this.saveBtn = false;
            this.addDeleteBtn = false;

        });
        dragulaService.over.subscribe((value) => {
            this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe((value) => {
            this.onOut(value.slice(1));
        });
    }

    ngOnInit() {
        this.addDeleteBtn = true;
        this.selectedIdx = "none";
        this.selectedIdxstage = "none";

        this.immigrationViewPetitionsService.getPetitionTypes().subscribe(
          res => {
            this.petitionTypes = res['petitionTypes'];
            this.selectedPetitionType = this.petitionTypes[0];
            this.getpetitionstages();
          }
        );
    }

    onClickOfPetitionType(petitionType,index) {
        this.selectedIdx = index;
        this.selectedPetitionType = petitionType;
        this.manageAccountPetitionStagesService.getPetitionStages(petitionType['petitionTypeId'], this.appService.user.accountId).subscribe(
            res => {
                this.petitionStages = res['petitionStageList'];
            }
        );
    }

    deleteStagesList(stage, index) {
            this.cancelBtn = false;

            this.dialogService.addDialog(ConfirmComponent, {
                title: 'Confirmation',
                message: 'Are you sure you want to Delete ' + stage.name + '?'
            })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.manageAccountPetitionStagesService.deletePetitionStage(stage['stageId']).subscribe(
                      res => {
                          if(res['statusCode'] === 'FAILURE'){
                              this.dialogService.addDialog(ConfirmComponent, {
                                 title: 'Information',
                                 message: res['statusDescription']
                              });
                          }
                          if(res['statusCode'] === 'SUCCESS'){
                              this.petitionStages.splice(index, 1);
                          }
                      });
                }
            });
     }



    private hasClass(el: any, name: string) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    }

    private addClass(el: any, name: string) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(' ') : name;
        }
    }

    private removeClass(el: any, name: string) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
        }
    }

    private onDrag(args) {
        let [e, el] = args;
        this.removeClass(e, 'ex-moved');
    }

    private onDrop(args) {
        let [e, el] = args;
        this.addClass(e, 'ex-moved');
    }

    private onOver(args) {
        let [e, el, container] = args;
        this.addClass(el, 'ex-over');
    }

    private onOut(args) {
        let [e, el, container] = args;
        this.removeClass(el, 'ex-over');
    }

    getpetitionstages() {
        this.manageAccountPetitionStagesService.getPetitionStages(this.selectedPetitionType['petitionTypeId'], this.appService.user.accountId).subscribe(
            res => {
                this.petitionStages = res['petitionStageList'];
                for (var stage of this.petitionStages){
                    stage['edit'] = false;
                }
            }
        );
    }



}
