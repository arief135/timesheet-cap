using {
  cuid,
  managed,
  User,
  sap.common.CodeList
} from '@sap/cds/common';

namespace metrasys.sap.timesheet;

entity TimesheetEntry : cuid, managed {
  activityType : Association to ActivityType;
  detail       : String;
  date         : Date;
  month        : Association to Month;
  year         : Integer;
  location     : Association to Location;
  user         : User;
}

entity ActivityType {
  key ID   : Integer;
      name : String(111);
}

entity Location {
  key ID   : Integer;
      name : String(111);
}

entity Month : CodeList {
  key ID : Integer;
}
