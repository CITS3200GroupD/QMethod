const settings = {
    RANGE_OFFERED: process.env['RANGE_OFFERED'] || [7, 9, 11],
    CHAR_LIMIT: process.env['CHAR_LIMIT'] || 350,
    NAME_LIMIT: process.env['NAME_LIMIT'] || 100,
    STATE_LIMIT: process.env['STATE_LIMIT'] || 80,
    FIELDS_LIMIT: process.env['FIELDS_LIMIT'] || 10,
}

module.exports = settings
