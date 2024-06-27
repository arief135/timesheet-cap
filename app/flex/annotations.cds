using TimesheetService as service from '../../srv/user-service';

annotate service.TimesheetEntry with @(UI.SelectionFields: [
    month_ID,
    year,
],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : atype_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : date,
        },
    ],);
