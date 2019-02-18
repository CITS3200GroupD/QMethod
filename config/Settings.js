const settings = {
    DEFAULT_RANGE: 11,
    RANGE_OFFERED: [7, 9, 11],
    PROGRESS_FLAGS: [0, 1, 2, 3],
    CHAR_LIMIT: 350,
    NAME_LIMIT: 100,
    STATE_LIMIT: 47,
    FIELDS_LIMIT: 10,
    FIELD_NAME_LIMIT: 100,
    PAGINATE_TABLES: 10,
    PAGINATE_LISTS: 10,
    EXPIRE_TIME: 7200,

    INS_PAGE_NAMES: ['Main', 'User ID Confirm', 'Initial Sort', 'Q-Sort', 'Questionnaire'],
    INS_LIMIT: [20, 5, 5, 5, 5, 5],
    INS_CHAR_LIMIT: 1000,

    DEFAULT_INSTRUCTIONS: [
        [
            `Thank you for agreeing to take part in our study. Please read carefully the following instructions. The program will ask you to follow these steps which will be detailed below.`,
            `Step 1) Fill out the questions that you will find in the next page.`,
            `Step 2) You will be given a series of statements. You will be able to read the statements one by one.
            Once you read a statement, sort it into one of three given groups that you will see on the screen, on whether you agree, you don't agree or you are neutral about it.
            You can always change your mind later.`,
            `Step 3) You will be shown the statements again, this time divided into the groups you sorted in step 2. Now,
            sort the statements out on the given graph from a +5 (most agree) to a -5 (least agree) scale.`,
            `Please remember that you can only sort the statements on the sorting grid by dragging and dropping each statement.`,
            `You must sort all statements.`,
            `Any card places in the same column has the same value, and it <i>does not matter</i> if you place it at the top of the bottom
            of a column.`,
            `If you place a card under a negative number, it does not mean that you don't agree with it. It means that you
            simply agree with it less than those on the column to its right and more than those on the column to its left.`,
            `Thank you so much for your help.`
        ],
        [
            'Please keep a record of the following information.',
            `In particular, your user ID is required if you wish to exit the survey and
             resume completion later or delete your data from the survey's dataset.`
        ],
        [
            `You will be given a series of statements.`,
            `Read these statement cards one by one.`,
            `Using your mouse to click and drag, sort the statement cards it into one of three given groups that you will see on the screen, depending on whether you agree, you don't agree or you are neutral about it.`
        ],
        [
            `You will be shown the statements again, this time divided into the groups you sorted in step 2.`,
            `Click on statements from the three groups, and drag them into empty spaces on the grid with your mouse. You should sort the statements out on the given graph from a +5 (most agree) to a -5 (least agree) scale. You may swap already placed statements in the grid by clicking and dragging.`,
            `Alternatively you may click on one of the statement groups (agree, disagree, neutral) and then click an empty space on the grid to place the top most statement into that empty space. The currently selected group is indicated by the tick.`
        ],
        []
    ],

    CONFIRMATION_TNC: `By clicking OK you acknowledge that you have read all relevant permission forms and agree to their terms and conditions`,
    /* Unless you know what you are doing, don't touch these */
    INS_INSTRUCTIONS: 0,
    INS_CONFIRM: 1,
    INS_INIT_SORT: 2,
    INS_Q_SORT: 3,
    INS_QUESTIONNAIRE: 4,
}

module.exports = settings;
