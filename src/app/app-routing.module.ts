import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RoleTypeSM } from './models/service/enums/role-type-s-m.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./components/main/end-user/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./components/main/end-user/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'teachers',
    loadChildren: () => import('./components/main/end-user/dummy-teacher/dummy-teacher.module').then(m => m.DummyTeacherModule),
    canActivate: [AuthGuard],
    data: {
      allowedRole: [RoleTypeSM.ClientAdmin]
    }
  },
  { path: 'superadmin/login', loadChildren: () => import('./components/main/superadmin/superadmin-login/superadmin-login.module').then(m => m.SuperadminLoginModule) },
  {
    path: 'superadmin',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/main/superadmin/superadmin-dashboard/superadmin-dashboard.module').then(m => m.SuperadminDashboardModule)
      },
    ],
    canActivate: [AuthGuard],
    data: {
      allowedRole: [
        RoleTypeSM.SuperAdmin,
        RoleTypeSM.SystemAdmin,
      ]
    }

  },


  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./components/main/not-found/not-found.module').then(m => m.NotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
