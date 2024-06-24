using {managed} from '@sap/cds/common';

namespace metrasys.sap.timesheet;

entity TimesheetEntry : managed {
  key ID       : Integer;
      atype    : Association to ActivityType;
      detail   : String;
      date     : Date;
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
