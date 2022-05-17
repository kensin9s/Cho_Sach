import moment from 'moment';

export class Order {
  constructor(id, items, totalAmount, date, address) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this._date = date;
    this.address = address;
    // this.ownerid=ownerid
  }
  get date() {
    return moment(this._date).format('MMMM Do YYYY, hh:mm');
  }
}
