import {IMyOptions} from 'mydatepicker';

export class IHDateUtil {
  public static datePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    showClearDateBtn: false,
    editableDateField: false,
    openSelectorTopOfInput: true,
    showSelectorArrow: false,
    alignSelectorRight:true
  };
}

