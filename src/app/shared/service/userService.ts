import { Observable, of } from "rxjs";
import { Iuser } from "../module/Iuser";
import { Injectable } from "@angular/core";
import { Iproduct, Ires } from "../module/Iproduct";






@Injectable({
    providedIn :'root'
})
export class UserService{

usersArr: Iuser[] = [
  {
    id: 1,
    firstName: 'Ronak',
    lastName: 'Indrawar',
    imageUrl:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    email: 'ronak.indrawar@gmail.com',
    phone: '9876543210',
    dateOfBirth: '2001-04-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: {
      street: 'Shivaji Nagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    skills: ['Angular', 'TypeScript', 'HTML'],
    projects: [
      {
        title: 'Employee Management System',
        technology: 'Angular',
        duration: '3 Months',
      },
      {
        title: 'User Management Portal',
        technology: 'Angular & JSON Server',
        duration: '2 Months',
      },
    ],
  },

  {
    id: 2,
    firstName: 'Priti',
    lastName: 'Kedare',
    imageUrl:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    email: 'pritikeadre@gmail.com',
    phone: '9876501234',
    dateOfBirth: '2002-08-20',
    gender: 'Female',
    bloodGroup: 'A+',
    address: {
      street: 'FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
    },
    skills: ['Java', 'Spring Boot', 'MySQL'],
    projects: [
      {
        title: 'Hospital Management System',
        technology: 'Spring Boot',
        duration: '5 Months',
      },
      {
        title: 'Online Quiz Portal',
        technology: 'Java',
        duration: '2 Months',
      },
    ],
  },
];

fetchAllUser() : Observable<Iuser[]>{
    return of(this.usersArr)
}


getUserById(id : number) :Observable<Iuser>{
    let userObj = this.usersArr.find(u => u.id === id)!;
    return of(userObj)
}

onCreateUser(userObj : Iuser) : Observable<Ires<Iuser>>{
  this.usersArr.unshift(userObj);
  return of({
    msg : `The use with id ${userObj.id} is added successfully...!`,
    data : userObj
  })
}

onUpdate(updatedObj : Iuser) : Observable<Ires<Iuser>>{
  let GETINDEX = this.usersArr.findIndex(u => u.id === updatedObj.id);
  this.usersArr[GETINDEX]= updatedObj;
  return of({
    msg : `The user with id ${updatedObj.id} is updated successfully...!`,
    data : updatedObj
  })
}

onRemoveUser(id : number) : Observable<Ires<Iuser>> {
  let GETINDEX = this.usersArr.findIndex(u => u.id === id);
  let array = this.usersArr.splice(GETINDEX,1);
  return of({
    msg : `The user with id ${id} is removed successfullly..!`,
    data : array[0]
  })
}
}