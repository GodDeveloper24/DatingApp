import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/Admin.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles()
  {
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  editRolesModal(user: User)
  {
      const initialState = {
        user,
        roles: this.getRolesArray(user)
      };
      this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
  }

  private getRolesArray(user)
  {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {
        name: 'Admin', value: 'Admin'
      },
      {
        name: 'Moderator', value: 'Moderator'
      },
      {
        name: 'Member', value: 'Member'
      },
      {
        name: 'VIP', value: 'VIP'
      },
    ];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < availableRoles.length; i++)
    {
      let isMatch = false;
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < userRoles.length; j++)
      {
        if (availableRoles[i].name === userRoles[j])
        {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch)
      {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }

}
