import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/module/Iuser';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { UserService } from 'src/app/shared/service/userService';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  UserForm!: FormGroup;
  isInEditMode: boolean = false;
  userId!: number;
  userObj!: Iuser;
  constructor(
    private _snackbar: SnackbarService,
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.onCreateForm();
    this.onAddSkill();
    this.onAddProject();
    this.onPatchdata();
  }
  onCreateForm() {
    this.UserForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      bloodGroup: new FormControl(null, [Validators.required]),
      address: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      skills: new FormArray([]),
      projects: new FormArray([]),
    });
  }

  get projectsArr() {
    return this.UserForm.get('projects') as FormArray;
  }

  onRemoveProject(i: number) {
    this.projectsArr.removeAt(i);
  }
  get skillsArr() {
    return this.UserForm.get('skills') as FormArray;
  }
  onAddSkill() {
    let skillControl = new FormControl(null, [Validators.required]);
    this.skillsArr.push(skillControl);
  }
  onAddProject() {
    let projectGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      technology: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
    });
    this.projectsArr.push(projectGroup);
  }

  onAddUser() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
    } else {
      let NEW_OBJ = {
        ...this.UserForm.value,
        id: Date.now(),
      };
      this._userService.onCreateUser(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackbar.openSnackbar(data.msg);
          this._router.navigate(['users']);
        },
      });
    }
  }

  onPatchdata() {
    this.userId = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.isInEditMode=true;
      this._userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.userObj = data;
          this.skillsArr.clear();
          this.userObj.skills.forEach((s) => {
            let skillControl = new FormControl(s, [Validators.required]);
            this.skillsArr.push(skillControl);
          });
          this.projectsArr.clear();
          this.userObj.projects.forEach((p) => {
            let projectGroup = new FormGroup({
              title: new FormControl(p.title, [Validators.required]),
              technology: new FormControl(p.technology, [Validators.required]),
              duration: new FormControl(p.duration, [Validators.required]),
            });
            this.projectsArr.push(projectGroup)
           
          });
           this.UserForm.patchValue(data);
        },
      });
    }
  }

  onUpdateUser(){
        if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
    } else {
      let UPDATED_OBJ = {
        ...this.UserForm.value,
        id: this.userId,
      };
      this._userService.onUpdate(UPDATED_OBJ).subscribe({
        next: (data) => {
          this._snackbar.openSnackbar(data.msg);
          this._router.navigate(['users']);
        },
      });
    }

  }
}
