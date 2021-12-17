import { LightningElement } from 'lwc';

export default class PhoneKeyboard extends LightningElement {

    CELL_DATA = [
        {title: "1"},
        {title: "2", subtitle: "ABC"},
        {title: "3", subtitle: "DEF"},
        {title: "4", subtitle: "GHI"},
        {title: "5", subtitle: "JKL"},
        {title: "6", subtitle: "MNO"},
        {title: "7", subtitle: "PQRS"},
        {title: "8", subtitle: "TUV"},
        {title: "9", subtitle: "WXYZ"},
        {title: "*"},
        {title: "0", subtitle: "+"},
        {title: "#"},
    ];
}