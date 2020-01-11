
class Country {
    constructor(
    public   numeric    : String,
    public    alpha2    : String,
    public    name      : String,
    public    emoji     : String,
    public    currency  : String,
    public    latitude  : String,
    public    longitude : String
    ) {}
 }

 class Bank {
     constructor(
        public name         : String,
        public url          : String,
        public phone        : String,
        public city         : String
     ) 
     {}
 }

class Number {
    constructor(
        public    length    : String,
        public    luhn      : String
    ) {}
}


export class Bin {
    constructor(
        public id               : String,
        public number           : Number,
        public scheme           : String,
        public type             : String,
        public brand            : String,
        public prepaid          : String,
        public country          : Country,
        public bank             : Bank
    ) {}
}