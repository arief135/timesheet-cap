using {metrasys.sap.timesheet as my} from '../db/schema';
using {User} from '@sap/cds/common';


service TimesheetService @(requires: 'authenticated-user') {
  entity TimesheetEntry @(restrict: [{
    grant: [
      'READ',
      'WRITE'
    ],
    where: '$user = createdBy'
  }])                 as projection on my.TimesheetEntry;

  entity ActivityType as projection on my.ActivityType;
  entity Location     as projection on my.Location;

  // unbounded function
  function getUser() returns User;
}

annotate TimesheetService.TimesheetEntry with @odata.draft.enabled;
