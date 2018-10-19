# QMd Settings

By modifying files within this folder (config), you may change various parameters related to the application.

```
const settings = {
    DEFAULT_RANGE: 11,
    RANGE_OFFERED: [7, 9, 11],
    PROGRESS_FLAGS: [0, 1, 2, 3],
    CHAR_LIMIT: 350,
    NAME_LIMIT: 100,
    STATE_LIMIT: 80,
    FIELDS_LIMIT: 10,
    FIELD_NAME_LIMIT: 100,
    PAGINATE_TABLES: 10,
    PAGINATE_LISTS: 5,
    EXPIRE_TIME: 7200,
}
```
RANGE_OFFERED - The number of columns in the survey grid. 7 corresponds to a range of -3 to +3, 9 to a range of +4 to -4, and so on. (Use only odd numbers)

DEFAULT RANGE - The default range (from the list of possible ranges)

PROGRESS_FLAGS - Progress indicators to indicate user progress. 0 when user is first created, 1 when the registration data is filled, 2 when the initial sort page is completed and 3 when the questionnaire data is submitted (and thus the survey is complete)

CHAR_LIMIT - The character limit for statements. Default is 350 characters.

NAME_LIMIT - The character limit for survey names. Default is 100 characters.

STATE_LIMIT - The maximum number of statements per survey. Default is 80 statements.

FIELDS_LIMIT - The maximum number of fields per questionnaire/registration. Default is 10 fields.

FIELD_NAME_LIMIT - The character limit for survey field questions. Default is 100 characters.

PAGINATE_TABLES - The maximum number of survey items to display per page (in survey list page). Default is 10.

PAGINATE_LISTS - The maximum number of registration/questionnaire fields to display per page (in edit). Default is 5.

EXPIRE_TIME - The amount of time that a login token can last before expiring (in seconds). Default is 7200 seconds.
