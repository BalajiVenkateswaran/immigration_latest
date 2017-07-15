import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {petition} from "../../models/petitions";
import {RestService} from "../../services/rest.service";

@Injectable()
export class Quetionairervice {

    constructor(private restService: RestService) {

    }

    public getQuestionare(questionnaireId: string) {

        console.log("PetitionsService|getPetitions|orgId:%o", questionnaireId);

        return this.restService.getData("/questionnaire/i129/" + questionnaireId);

    }

    public savequetionaire(petitonerInfo: any, contact: any, petitionInfo: any, beneficiaryInfo: any, processingInfo: any, processingInfoAddress: any, basicInfoAboutEmployeer: any, basicInfoAboutEmployeerAddress: any, petitionerSignatureDetails: any, questionnaireId: string,certificationRequired:boolean) {



        var req = {
            "i129": {

                "petitionerInfo": petitonerInfo,
                "petitinInfo": petitionInfo,
                "beneficiaryInfo": beneficiaryInfo,
                "processingInfo": processingInfo,
                "basicInfoAboutEmployer": basicInfoAboutEmployeer,
                "petitionerSignatureDetails": petitionerSignatureDetails,
                "certificationRequired": certificationRequired

            },
            "questionnaireId": questionnaireId
        };


        console.log(req);


        return this.restService.postData("/questionnaire/i129", req);


    }

    public populateQuestionnaireI129(questionnaireID: string) {
        console.log(questionnaireID);
        return this.restService.postData("/questionnaire/populate/"+ questionnaireID, {});
    }




}
