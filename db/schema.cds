using {
  cuid,
  managed,
  sap.common.CodeList
} from '@sap/cds/common';

namespace metrasys.sap.timesheet;

entity TimesheetEntry : cuid, managed {
  atype    : Association to ActivityType;
  detail   : String;
  date     : Date;
  month    : Association to Month;
  year     : Integer;
  location : Association to Location;
}

entity ActivityType {
  key ID         : Integer;
      name       : String(111);
      timesheets : Association to many TimesheetEntry
                     on timesheets.atype = $self;
}

entity Location {
  key ID         : Integer;
      name       : String(111);
      timesheets : Association to many TimesheetEntry
                     on timesheets.location = $self;
}

entity Month : CodeList {
  key ID : Integer;
}
