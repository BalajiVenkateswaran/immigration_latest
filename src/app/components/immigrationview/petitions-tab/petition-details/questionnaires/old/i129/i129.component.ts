import { AppService } from '../../../../../../../services/app.service';
import { Component, OnInit } from '@angular/core';
import {Quetionairervice} from "./i129.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-questionnaire-i129.component',
    templateUrl: './i129.component.html',
    styleUrls: ['./i129.component.sass']
})
export class QuestionnaireI129Component implements OnInit {
    isPetitionInformationEdit;
    private gender: any[] = [];
    private typesOfOffice: any[] = [];
    private states: any[] = [];
    private numberOfStates:any[] = [];
    private questionnaire: any[] = [];
    isquestionnaireEdit;
    private petionInfomation: any[] = [];
    private contact: any[] = [];
    private organization: any={};
    private petitionInfo: any={};
    private beneficiaryInfo: any={};
    private processingInfo: any = {};
    private processingInfoAddress: any = {};
    private basicInfoAboutEmployeer: any = {};
    private basicInfoAboutEmployeerAddress: any = {};
    private petitionerSignatureDetails: any = {};
    private beforeCancelPetitonerInfo: any = {};
    private beforeCancelAddress: any[] = [];
    private beforeCancelContact: any[] = [];
    questions: any[] = [];
    private beforeCancelpetitionInfo: any[] = [];
    private beforeCancelbeneficiaryInfo: any[] = [];
    private beforeCancelprocessingInfo: any[] = [];
    private beforeCancelprocessingInfoAddress: any[] = [];
    private CancelbasicInfoAboutEmployeerAddress: any[] = [];
    private CancelbasicInfoAboutEmployeer: any[] = [];
    private CancelpetitionerSignatureDetails: any[] = [];
    private petitonerInfo: any = {};
    private apt: any[] = [];
    private certificationRequired: boolean;
    private street: any[] = [];
    private floor: any[] = [];
    private ischecking: any[] = [];
    private streetvalue: any[] = [];
    private i129: any = {};
    private result: boolean;
    private resultdata: boolean;
    private data: boolean;
    private data1: boolean;
    private questionnaireId: string;
  
     private myDatePickerOptions: IMyOptions = {
          //other options...
         dateFormat: 'mm-dd-yyyy',
         showClearDateBtn: false,
     }; 

    constructor(private quetionairervice: Quetionairervice, public appService: AppService,
    private route: ActivatedRoute,
              private router: Router) {
    }

 
    ngOnInit() {
       
        this.gender = [
            { value: '0', name: 'select gender' },
            { value: '1', name: 'M' },
            { value: '2', name: 'F' },

        ]

        this.typesOfOffice = [
            { value: '0', name: 'select OfficeType' },
            { value: '1', name: 'Consulate' },
            { value: '2', name: 'Pre-flight inspection' },
            { value: '3', name: 'Port of Entry' }
        ]
        this.states = [
            { value: '0', name: 'select State' },
            { value: '1', name: 'AA' },
            { value: '2', name: 'AE' },
            { value: '3', name: 'AK' },
            { value: '4', name: 'AL' },
            { value: '5', name: 'AP' },
            { value: '6', name: 'AR' },
            { value: '7', name: 'AS' },
            { value: '8', name: 'AZ' },
            { value: '9', name: 'CA' },
            { value: '10', name: 'CO' },
            { value: '11', name: 'CT' },
            { value: '12', name: 'DC' },
            { value: '13', name: 'DE' },
            { value: '14', name: 'FL' },
            { value: '15', name: 'FM' },
            { value: '16', name: 'GA' },
            { value: '17', name: 'GU' },
            { value: '18', name: 'HI' },
            { value: '19', name: 'IA' },
            { value: '20', name: 'ID' },
            { value: '21', name: 'IL' },
            { value: '22', name: 'IN' },
            { value: '23', name: 'KS' },
            { value: '24', name: 'KY' },
            { value: '25', name: 'LA' },
            { value: '26', name: 'MA' },
            { value: '27', name: 'MD' },
            { value: '28', name: 'ME' },
            { value: '29', name: 'MH' },
            { value: '30', name: 'MI' },
            { value: '31', name: 'MN' },
            { value: '32', name: 'MO' },
            { value: '33', name: 'MP' },
            { value: '34', name: 'MS' },
            { value: '35', name: 'MT' },

            { value: '36', name: 'NC' },
            { value: '37', name: 'ND' },
            { value: '38', name: 'NE' },
            { value: '39', name: 'NH' },
            { value: '40', name: 'NJ' },
            { value: '41', name: 'NM' },
            { value: '42', name: 'NV' },
            { value: '43', name: 'NY' },

            { value: '44', name: 'OH' },
            { value: '45', name: 'OK' },
            { value: '46', name: 'OR' },

            { value: '47', name: 'PA' },
            { value: '48', name: 'PR' },
            { value: '49', name: 'PW' },

            { value: '50', name: 'RI' },

            { value: '51', name: 'SC' },
            { value: '52', name: 'SD' },

            { value: '53', name: 'TN' },
            { value: '54', name: 'TX' },

            { value: '55', name: 'UT' },

            { value: '56', name: 'VA' },
            { value: '57', name: 'VI' },
            { value: '58', name: 'VT' },


            { value: '59', name: 'WA' },
            { value: '60', name: 'WI' },
            { value: '61', name: 'WV' },
            { value: '62', name: 'WY' }
        ]


       this.apt = [
            { value: 'Apt', name: 'APT' },
            { value: 'Ste', name: 'STE' },
            { value: 'Flr', name: 'FLR' }
        ]
       this.questions = [
           {
               "id": "0",
               "display": "Yes",
               "value": true
           },
           {
               "id": "1",
               "display": "No",
               "value": false
           },
       ];

       this.route.params.subscribe(params => {
           this.questionnaireId = params['questionnaireId'];
           this.quetionairervice
            .getQuestionare(this.questionnaireId)
            .subscribe((res: any) => {
               if(res['i129'] != undefined){

                if (res['i129']['certificationRequired'] == true) {
                    this.result = true;
                }

                if (res['i129']['certificationRequired'] == false) {
                    this.resultdata = true;
                }

                if (res['i129']['petitionerInfo'] != undefined) {
                    this.petitonerInfo = res['i129']['petitionerInfo'];
                    if (res['i129']['petitionerInfo']['address'] != undefined) {
                                        this.questionnaire = res['i129']['petitionerInfo']['address'];
                                    }
                                    if (res['i129']['petitionerInfo']['contact'] != undefined) {
                                        this.contact = res['i129']['petitionerInfo']['contact'];
                                    }
                }


                if (res['i129']['petitinInfo'] != undefined) {
                   this.petitionInfo = res['i129']['petitinInfo'];
                }

                if (res['i129']['beneficiaryInfo'] != undefined) {
                    this.beneficiaryInfo = res['i129']['beneficiaryInfo'];
                }
                 if (res['i129']['processingInfo'] != undefined) {
                    this.processingInfo = res['i129']['processingInfo'];
                    if (res['i129']['processingInfo']['foreignAddress']!= undefined) {
                                        this.processingInfoAddress = res['i129']['processingInfo']['foreignAddress'];
                                    }
                 }



                if (res['i129']['basicInfoAboutEmployer'] != undefined) {
                    this.basicInfoAboutEmployeer = res['i129']['basicInfoAboutEmployer'];
                    if (res['i129']['basicInfoAboutEmployer']['address'] != undefined) {
                        this.basicInfoAboutEmployeerAddress = res['i129']['basicInfoAboutEmployer']['address'];
                    }
                }

                if (res['i129']['petitionerSignatureDetails'] != undefined) {
                    this.petitionerSignatureDetails = res['i129']['petitionerSignatureDetails'];
                }
                }
                this.isquestionnaireEdit = true;
            });
       });
    }

   onDateChanged(event: IMyDateModel) {

    }

   highlightSBLink(link) {
       this.appService.currentSBLink = link;
   }
   savequestionnaireInformation() {

      
       if (this.beneficiaryInfo['dateOfBirth'] && this.beneficiaryInfo['dateOfBirth']['formatted']) {
           this.beneficiaryInfo['dateOfBirth'] = this.beneficiaryInfo['dateOfBirth']['formatted'];
       }
       if (this.beneficiaryInfo['dateOfLastArrival'] && this.beneficiaryInfo['dateOfLastArrival']['formatted']) {
           this.beneficiaryInfo['dateOfLastArrival'] = this.beneficiaryInfo['dateOfLastArrival']['formatted'];
       }
       if (this.beneficiaryInfo['passportIssueDate'] && this.beneficiaryInfo['passportIssueDate']['formatted']) {
           this.beneficiaryInfo['passportIssueDate'] = this.beneficiaryInfo['passportIssueDate']['formatted'];
       }
       if (this.beneficiaryInfo['passportExpiryDate'] && this.beneficiaryInfo['passportExpiryDate']['formatted']) {
           this.beneficiaryInfo['passportExpiryDate'] = this.beneficiaryInfo['passportExpiryDate']['formatted'];
       }
       if (this.beneficiaryInfo['dateStatusExpires'] && this.beneficiaryInfo['dateStatusExpires']['formatted']) {
           this.beneficiaryInfo['dateStatusExpires'] = this.beneficiaryInfo['dateStatusExpires']['formatted'];
       }
       if (this.beneficiaryInfo['intendEmploymentDate'] && this.beneficiaryInfo['intendEmploymentDate']['formatted']) {
           this.beneficiaryInfo['intendEmploymentDate'] = this.beneficiaryInfo['intendEmploymentDate']['formatted'];
       }
       this.isquestionnaireEdit = true;
       this.quetionairervice.savequetionaire(this.petitonerInfo, this.contact, this.petitionInfo, this.beneficiaryInfo, this.processingInfo, this.processingInfoAddress, this.basicInfoAboutEmployeer, this.basicInfoAboutEmployeerAddress, this.petitionerSignatureDetails, this.questionnaireId,this.certificationRequired).subscribe
           (
           res => { console.log(res);}
           );


    }
   repopulateI129() {
       this.quetionairervice.populateQuestionnaireI129(this.questionnaireId).subscribe(res => {
           if (res['statusCode'] == "SUCCESS") {

           }
       });

   }
   editQuestinnaireForm() {

        this.isquestionnaireEdit = !this.isquestionnaireEdit;
        this.beforeCancelPetitonerInfo = (<any>Object).assign({}, this.petitonerInfo);
        this.beforeCancelAddress = (<any>Object).assign({}, this.questionnaire);
        this.beforeCancelContact = (<any>Object).assign({}, this.contact);
        this.beforeCancelpetitionInfo = (<any>Object).assign({}, this.petitionInfo);
        this.beforeCancelbeneficiaryInfo = (<any>Object).assign({}, this.beneficiaryInfo);
        this.beforeCancelprocessingInfo = (<any>Object).assign({}, this.processingInfo);
        this.beforeCancelprocessingInfoAddress = (<any>Object).assign({}, this.processingInfoAddress);
        this.CancelbasicInfoAboutEmployeerAddress = (<any>Object).assign({}, this.basicInfoAboutEmployeerAddress);
        this.CancelbasicInfoAboutEmployeer = (<any>Object).assign({}, this.basicInfoAboutEmployeer);
        this.CancelpetitionerSignatureDetails = (<any>Object).assign({}, this.petitionerSignatureDetails);


     
    }
    cancelQuestinnaireEdit() {
        this.isquestionnaireEdit = !this.isquestionnaireEdit;

        this.petitonerInfo = this.beforeCancelPetitonerInfo;
        this.questionnaire = this.beforeCancelAddress;
        this.contact = this.beforeCancelContact;
        this.petitionInfo = this.beforeCancelpetitionInfo;
        this.beneficiaryInfo = this.beforeCancelbeneficiaryInfo;
        this.processingInfo = this.beforeCancelprocessingInfo;
        this.processingInfoAddress = this.beforeCancelprocessingInfoAddress;
        this.basicInfoAboutEmployeerAddress = this.CancelbasicInfoAboutEmployeerAddress;
        this.basicInfoAboutEmployeer = this.CancelbasicInfoAboutEmployeer;
        this.petitionerSignatureDetails = this.CancelpetitionerSignatureDetails;

   }

    checkedChange(event) {
        if (event.target.checked) {
            this.resultdata = false;
            this.result = true;
            this.certificationRequired = true;

        }
    }

    checkedChanges(event) {
        if (event.target.checked) {
            this.result = false;
            this.resultdata = true;
            this.certificationRequired = false;

        }
    }

}
