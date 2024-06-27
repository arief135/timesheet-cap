using TimesheetService as service from '../../srv/user-service';

annotate service.TimesheetEntry {
    month @title: 'Month';
    year @title: 'Year';
}


annotate service.TimesheetEntry with @(
    UI.LineItem       : [
        {
            $Type: 'UI.DataField',
            Label: 'ID',
            Value: ID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Type',
            Value: atype_ID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Detail',
            Value: detail,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Date',
            Value: date,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Location',
            Value: location_ID,
        },
    ],
    UI.SelectionFields : [
        month_ID,
        year,
    ],
);
