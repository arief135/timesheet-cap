using {metrasys.sap.timesheet as my} from '../db/schema';

service TimesheetService {
  entity TimesheetEntry as projection on my.TimesheetEntry;
  entity ActivityType   as projection on my.ActivityType;
  entity Location       as projection on my.Location;
}
